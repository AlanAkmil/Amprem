import { NextResponse } from "next/server";

import { verifyMagicLink } from "@/lib/am-api.server";
import { forbidden, isSameOrigin } from "@/lib/security";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return forbidden();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Body request tidak valid." },
      { status: 400 },
    );
  }

  const result = await verifyMagicLink(body);
  return NextResponse.json(result);
}
