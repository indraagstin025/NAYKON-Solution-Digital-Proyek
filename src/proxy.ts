import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  SESSION_COOKIE_NAME,
  SESSION_REFRESH_INTERVAL_SECONDS,
  SESSION_TTL_SECONDS,
  decryptSessionToken,
  encryptSessionToken,
  getClearedSessionCookieOptions,
  getSessionCookieOptions,
} from "@/lib/session-crypto";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const rawToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await decryptSessionToken(rawToken);

  if (!session) {
    const unauthResponse = pathname.startsWith("/api/")
      ? NextResponse.json(
          { error: "Unauthorized" },
          {
            status: 401,
            headers: { "Cache-Control": "private, no-store, max-age=0" },
          }
        )
      : NextResponse.rewrite(new URL("/__nk_unmapped_404", request.url));

    // Purge expired or tampered session cookies immediately so stale state never lingers.
    if (rawToken) {
      unauthResponse.cookies.set(
        SESSION_COOKIE_NAME,
        "",
        getClearedSessionCookieOptions()
      );
    }

    return unauthResponse;
  }

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");

  const nowSeconds = Math.floor(Date.now() / 1000);
  const remainingAbsoluteSeconds = session.abs - nowSeconds;

  if (
    remainingAbsoluteSeconds > 60 &&
    nowSeconds - session.rf >= SESSION_REFRESH_INTERVAL_SECONDS
  ) {
    try {
      const nextMaxAge = Math.min(SESSION_TTL_SECONDS, remainingAbsoluteSeconds);
      const refreshedToken = await encryptSessionToken({
        sub: session.sub,
        sv: session.sv,
        rf: nowSeconds,
        abs: session.abs,
      });
      response.cookies.set(
        SESSION_COOKIE_NAME,
        refreshedToken,
        getSessionCookieOptions(nextMaxAge)
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
