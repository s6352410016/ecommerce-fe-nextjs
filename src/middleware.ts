import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest){
  const cookie = await cookies();

  if(!cookie.get("delete-cart") && !cookie.get("enable")){
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/auth-verify", "/checkout"],
}