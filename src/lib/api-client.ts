import type {
  ActionResult,
  DonationResult,
  HealthResult,
  InfoResult,
} from "@/lib/am-api.types";

async function readJson<T>(response: Response): Promise<T> {
  return (await response.json()) as T;
}

export async function fetchHealth(): Promise<HealthResult> {
  return readJson<HealthResult>(await fetch("/api/status"));
}

export async function fetchInfo(): Promise<InfoResult> {
  return readJson<InfoResult>(await fetch("/api/info"));
}

export async function postSendLink(email: string): Promise<ActionResult> {
  const response = await fetch("/api/activation/send", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return readJson<ActionResult>(response);
}

export async function postVerify(values: {
  email: string;
  magicLink: string;
}): Promise<ActionResult> {
  const response = await fetch("/api/activation/verify", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(values),
  });
  return readJson<ActionResult>(response);
}

export async function postDonationProof(formData: FormData): Promise<DonationResult> {
  const response = await fetch("/api/donation", { method: "POST", body: formData });
  return readJson<DonationResult>(response);
}
