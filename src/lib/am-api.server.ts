import "server-only";

import { z } from "zod";

import { API_BASE_URL, API_ENDPOINTS } from "@/config/api";
import {
  errorMessageFor,
  type ActionResult,
  type HealthResult,
  type InfoResult,
} from "@/lib/am-api.types";

const SENSITIVE = /token|secret|credential|password|cookie|refresh|idtoken|apikey/i;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function pickString(source: Record<string, unknown>, keys: string[]): string | undefined {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "string" && value.trim() !== "" && !SENSITIVE.test(key)) {
      return value;
    }
  }
  return undefined;
}

function readableError(payload: Record<string, unknown>, status: number): ActionResult {
  const rawCode =
    pickString(payload, ["code", "error", "errorCode", "reason"]) ??
    (status >= 500 ? "SERVER_ERROR" : "UNKNOWN_ERROR");
  const code = rawCode.toUpperCase().replace(/[^A-Z_]/g, "_");
  const message =
    pickString(payload, ["message", "msg", "detail", "description"]) ?? errorMessageFor(code);
  const generic = code === "UNKNOWN_ERROR" || code === "SERVER_ERROR";
  return {
    ok: false,
    ...(generic ? {} : { code }),
    message: SENSITIVE.test(message) ? errorMessageFor(code) : message,
  };
}

async function callApi(
  path: string,
  init?: RequestInit,
): Promise<{ status: number; payload: Record<string, unknown> } | null> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      cache: "no-store",
      headers: {
        "content-type": "application/json",
        origin: API_BASE_URL,
        referer: `${API_BASE_URL}/`,
        ...(init?.headers ?? {}),
      },
      signal: AbortSignal.timeout(30000),
    });
    let payload: Record<string, unknown> = {};
    try {
      const parsed = await response.json();
      if (parsed && typeof parsed === "object") payload = parsed as Record<string, unknown>;
    } catch {
      payload = {};
    }
    return { status: response.status, payload };
  } catch {
    return null;
  }
}

export async function getHealth(): Promise<HealthResult> {
  const checkedAt = new Date().toISOString();
  const result = await callApi(API_ENDPOINTS.health);
  if (!result || result.status >= 400) return { online: false, checkedAt };
  const payload = result.payload;
  return {
    online: payload["status"] === "online" || payload["status"] === true,
    version: typeof payload["version"] === "string" ? payload["version"] : undefined,
    uptime: typeof payload["uptime"] === "number" ? payload["uptime"] : undefined,
    ts: typeof payload["ts"] === "string" ? payload["ts"] : undefined,
    checkedAt,
  };
}

export async function getInfo(): Promise<InfoResult> {
  const result = await callApi(API_ENDPOINTS.info);
  if (!result || result.status >= 400) return { ok: false };
  const payload = result.payload;
  const plan = (payload["plan"] ?? {}) as Record<string, unknown>;
  const benefits = Array.isArray(payload["benefits"])
    ? (payload["benefits"] as unknown[]).filter((b): b is string => typeof b === "string")
    : undefined;
  return {
    ok: true,
    plan: {
      name: typeof plan["name"] === "string" ? plan["name"] : undefined,
      type: typeof plan["type"] === "string" ? plan["type"] : undefined,
      duration: typeof plan["duration"] === "string" ? plan["duration"] : undefined,
    },
    benefits,
  };
}

const emailSchema = z.object({ email: z.string().trim().min(3).max(320) });

export async function sendMagicLink(input: unknown): Promise<ActionResult> {
  const parsed = emailSchema.safeParse(input);
  if (!parsed.success || !EMAIL_REGEX.test(parsed.data.email)) {
    return { ok: false, code: "INVALID_EMAIL", message: errorMessageFor("INVALID_EMAIL") };
  }
  const { email } = parsed.data;

  const result = await callApi(API_ENDPOINTS.sendLink, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
  if (!result) {
    return { ok: false, code: "API_OFFLINE", message: errorMessageFor("API_OFFLINE") };
  }
  if (result.status >= 400 || result.payload["status"] === false) {
    return readableError(result.payload, result.status);
  }
  return {
    ok: true,
    message: "Link berhasil dikirim. Sekarang buka inbox email kamu.",
    data: { email },
  };
}

const verifySchema = z.object({
  email: z.string().trim().min(3).max(320),
  magicLink: z.string().trim().min(10).max(4000),
});

export async function verifyMagicLink(input: unknown): Promise<ActionResult> {
  const parsed = verifySchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: errorMessageFor() };
  }
  const data = parsed.data;
  if (!EMAIL_REGEX.test(data.email)) {
    return { ok: false, code: "INVALID_EMAIL", message: errorMessageFor("INVALID_EMAIL") };
  }

  const result = await callApi(API_ENDPOINTS.verify, {
    method: "POST",
    body: JSON.stringify({ email: data.email, magicLink: data.magicLink }),
  });
  if (!result) {
    return { ok: false, code: "API_OFFLINE", message: errorMessageFor("API_OFFLINE") };
  }
  if (result.status >= 400 || result.payload["status"] === false) {
    return readableError(result.payload, result.status);
  }

  const payload = result.payload;
  // API asli membungkus data di payload.result: { user: {...}, premium: {...} }
  const nested = (payload["data"] ?? payload["result"] ?? {}) as Record<string, unknown>;
  const userObj = (nested["user"] ?? {}) as Record<string, unknown>;
  const premiumObj = (nested["premium"] ?? nested) as Record<string, unknown>;
  const plan = (premiumObj["plan"] ?? payload["plan"] ?? nested["plan"] ?? {}) as
    | Record<string, unknown>
    | string;
  const planObject = typeof plan === "string" ? { name: plan } : plan;
  const benefits = [premiumObj["benefits"], payload["benefits"], nested["benefits"]].find(
    (value) => Array.isArray(value),
  ) as unknown[] | undefined;

  const uid =
    typeof userObj["uid"] === "string" && userObj["uid"].trim() !== ""
      ? userObj["uid"]
      : pickString({ ...nested, ...payload }, ["uid"]);
  const orderId =
    typeof premiumObj["orderId"] === "string" && premiumObj["orderId"].trim() !== ""
      ? premiumObj["orderId"]
      : pickString({ ...nested, ...payload }, ["orderId", "order_id"]);

  return {
    ok: true,
    message: "Verifikasi berhasil.",
    data: {
      email: pickString({ ...userObj, ...nested, ...payload }, ["email"]) ?? data.email,
      uid,
      orderId,
      plan: pickString(planObject as Record<string, unknown>, ["name", "type"]),
      duration:
        pickString(planObject as Record<string, unknown>, ["duration"]) ??
        pickString({ ...premiumObj, ...nested, ...payload }, ["duration"]),
      validUntil: pickString({ ...premiumObj, ...nested, ...payload }, [
        "validUntil",
        "expiresAt",
        "expiry",
        "expireAt",
        "until",
      ]),
      benefits: benefits?.filter((b): b is string => typeof b === "string"),
    },
  };
}
