import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import paths from "./utils/paths.utils";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const currentPath = request.nextUrl.pathname;

  const unprotectedPaths = [
    paths.homePath(),
    paths.getLoginPath(),
    paths.getSignupPath(),
  ];

  const isStaticAsset =
    currentPath.startsWith("/_next") ||
    currentPath.startsWith("/static") ||
    /\.(.*)$/.test(currentPath);

  if (isStaticAsset) {
    return NextResponse.next();
  }

  // **LOGOUT** logic - Clear cookie and redirect to login page
  if (currentPath === "/logout") {
    const response = NextResponse.redirect(
      new URL(paths.getLoginPath(), request.url)
    );

    // Remove the token cookie by setting it with an immediate expiry date
    response.cookies.set("token", "", {
      expires: new Date(0), // Setting an expired date to immediately clear the cookie
      secure: true, // Ensure the cookie is secure
      sameSite: "none", // SameSite value to ensure it works across requests
      path: "/",
    });

    return response;
  }

  // Redirect authenticated users from /login or /signup to /admin-panel
  if (
    token &&
    (currentPath === paths.getLoginPath() ||
      currentPath === paths.getSignupPath())
  ) {
    return NextResponse.redirect(new URL(paths.getAuthorPath(), request.url));
  }

  // Redirect anyone accessing /admin-panel to /author
  if (currentPath === paths.getAdminPanelPath()) {
    return NextResponse.redirect(new URL(paths.getAuthorPath(), request.url));
  }

  // Keep user on the homepage regardless of authentication after refresh
  if (currentPath === paths.homePath()) {
    return NextResponse.next();
  }

  const isUnprotectedPath = unprotectedPaths.some(
    (path) => currentPath === path
  );

  if (!isUnprotectedPath && !token) {
    const redirectUrl = new URL(paths.getLoginPath(), request.url);
    redirectUrl.searchParams.set("redirect", currentPath);
    return NextResponse.redirect(redirectUrl);
  }

  // If a valid token exists, set it as a cookie for SSR
  if (token) {
    const response = NextResponse.next();
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // Cookie will expire after 7 days
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
