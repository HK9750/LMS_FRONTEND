import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isRefreshToken = request.cookies.has("refreshToken");

  // Extract the pathname from the request URL
  const { pathname } = request.nextUrl;

  // Define the routes where middleware should apply
  const protectedRoutes = [
    /^\/profile\/.*/, // Matches /profile/*
    /^\/course\/.*$/, // Matches /course/8
    /^\/dashboard\/.*$/, // Matches /dashboard/8
  ];

  // Check if the current path matches any of the protected routes
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
