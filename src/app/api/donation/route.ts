import { NextResponse } from "next/server";

import { sendDonationProof } from "@/lib/donation.server";
import { forbidden, isSameOrigin } from "@/lib/security";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return forbidden();

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Body request tidak valid." },
      { status: 400 },
    );
  }

  const result = await sendDonationProof(formData);
  return NextResponse.json(result);
}
