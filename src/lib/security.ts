import "server-only";

// Pengganti CSRF middleware TanStack: tolak POST lintas-origin.
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function forbidden() {
  return Response.json({ ok: false, message: "Permintaan ditolak." }, { status: 403 });
}
