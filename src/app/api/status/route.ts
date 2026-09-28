import { NextResponse } from "next/server";

import { getHealth } from "@/lib/am-api.server";

export async function GET() {
  const result = await getHealth();
  return NextResponse.json(result);
}
