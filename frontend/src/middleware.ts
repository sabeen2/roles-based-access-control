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

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
