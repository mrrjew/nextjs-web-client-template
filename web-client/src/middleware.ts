import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const isAuthRelatedRoutes = (pathname: string) => {
  return pathname.startsWith("/auth");
};

const routeRequiringAuth = ["/account", "/inbox"];
const whiteListedRoutes = [
  "/auth/login",
  "/auth/signup",
  "/auth/forgot-password",
  "/api/media",
  "/_next/image",
  "/api",
];

const checkRouteRequiresAuth = (pathname: string) => {
  return routeRequiringAuth.some((route) => pathname.startsWith(route));
};

export async function middleware(request: NextRequest) {
  // check if route is part of the whiteListedRoutes
  if (
    whiteListedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route),
    )
  ) {
    // console.log("whiteListedRoutes url: ", request.nextUrl.pathname );
    return NextResponse.next();
  }

  // if (request.nextUrl.pathname.startsWith("/_next")) {
  //   return NextResponse.next();
  // }

  const cookies = request.cookies;
  const authToken = cookies.get("auth-token")?.value;

  let isValidToken = false;
  // const _baseUrl = process.env.BACKEND_URL as string;

  try {
    const checkToken = await fetch(
      `${process.env.BACKEND_URL}/auth/check-token`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
    if (checkToken?.status === 200) {
      isValidToken = true;
    }
  } catch (error: any) {
    // console.error("Error checking token", error);
  }

  if (isAuthRelatedRoutes(request.nextUrl.pathname) && isValidToken) {
    return NextResponse.redirect(new URL("/", request.nextUrl).href);
  }

  if (!isValidToken && checkRouteRequiresAuth(request.nextUrl.pathname)) {
    // console.log("isValidToken", isValidToken);
    // console.log(
    //   "checkRouteRequiresAuth",
    //   checkRouteRequiresAuth(request.nextUrl.pathname),
    // );
    return NextResponse.redirect(new URL(`/auth/login`, request.nextUrl).href);
  }

  return NextResponse.next();
  // // if the request url contains /auth/login or /auth/signin and isValidToken is true then redirect to home page
  // if (isLoginRoutes(request.nextUrl.pathname) && isValidToken) {
  //   return NextResponse.redirect(new URL('/', request.nextUrl).href);
  // }
  // // if the request url contains /auth/login or /auth/signin and isValidToken is false then return the request
  // if (isLoginRoutes(request.nextUrl.pathname) && !isValidToken) {
  //   return NextResponse.next();
  // }
  // if (isValidToken) {
  //   return NextResponse.next();
  // }
  // return NextResponse.redirect(
  //   new URL(
  //     `/auth/login?from=${encodeURIComponent(request.nextUrl.pathname)}`,
  //     request.nextUrl
  //   ).href
  // );
}
