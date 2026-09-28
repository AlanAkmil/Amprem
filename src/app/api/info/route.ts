import { NextResponse } from "next/server";

import { getInfo } from "@/lib/am-api.server";

export async function GET() {
  const result = await getInfo();
  return NextResponse.json(result);
}
