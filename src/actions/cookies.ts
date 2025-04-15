"use server";

import { cookies } from "next/headers";

export async function setCookie() {
  const cookieStore = await cookies();
  cookieStore.set("enable", "true", {
    path: "/",
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24, // 1 day
  });
}

export async function setCookieCart() {
  const cookieStore = await cookies();
  cookieStore.set("delete-cart", "true", {
    path: "/",
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24, // 1 day
  });
}

export async function deleteCookie() {
  (await cookies()).delete("enable");
}

export async function deleteCookieCart() {
  (await cookies()).delete("delete-cart");
}

export async function getCookieCart(){
  return ((await cookies()).get("delete-cart"))?.value;
}

export async function hasCookie() {
  const cookie = await cookies();
  if (!cookie.has("enable")) {
    return null;
  }

  return true;
}
