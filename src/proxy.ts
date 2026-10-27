import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  SESSION_COOKIE_NAME,
  SESSION_REFRESH_INTERVAL_SECONDS,
  decryptSessionToken,
  encryptSessionToken,
  getSessionCookieOptions,
} from "@/lib/session-crypto";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const rawToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await decryptSessionToken(rawToken);

  if (!session) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rewrite unauthenticated /admin visits to an unmapped internal path so Next.js
    // renders the standard 404 page with HTTP 404 without revealing that /admin exists.
    return NextResponse.rewrite(new URL("/__nk_unmapped_404", request.url));
  }

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");

  const nowSeconds = Math.floor(Date.now() / 1000);
  if (nowSeconds - session.rf >= SESSION_REFRESH_INTERVAL_SECONDS) {
    try {
      const refreshedToken = await encryptSessionToken({
        sub: session.sub,
        sv: session.sv,
        rf: nowSeconds,
      });
      response.cookies.set(
        SESSION_COOKIE_NAME,
        refreshedToken,
        getSessionCookieOptions()
      );
    } catch {
      // Skip silent cookie refresh if secret rotation is in progress; server layout still validates.
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/api/media/:path*",
    "/api/analytics/:path*",
  ],
};
