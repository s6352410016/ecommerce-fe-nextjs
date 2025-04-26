import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const cookie = await cookies();
  const pathname = request.nextUrl.pathname;

  if (
    pathname === "/auth-verify" ||
    pathname === "/checkout" ||
    pathname === "/create-order"
  ) {
    if (!cookie.get("delete-cart") && !cookie.get("enable")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else if (pathname === "/order") {
    if (!cookie.get("accessToken")) {
      let prevPath = "";
      const referer = request.headers.get("referer");
      if (referer) {
        const path = referer.split("/").pop();
        !path
          ? (prevPath = "/")
          : path.includes("?")
          ? (prevPath = "/")
          : (prevPath = path);

        return NextResponse.redirect(new URL(prevPath, request.url));
      }
    }
  }
}

export const config = {
  matcher: ["/auth-verify", "/checkout", "/create-order", "/order"],
};
