import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isRefreshToken = request.cookies.has("refreshToken");
  console.log("isRefreshToken", isRefreshToken);

  const { pathname } = request.nextUrl;

  const protectedRoutes = [
    /^\/profile(\/.*)?$/,
    /^\/course(\/.*)?$/,
    /^\/dashboard(\/.*)?$/,
    /^\/courseaccess(\/.*)?$/,
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    route.test(pathname)
  );

  if (isProtectedRoute && !isRefreshToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export default middleware;
