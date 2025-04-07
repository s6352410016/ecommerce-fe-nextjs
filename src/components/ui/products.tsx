"use server";

import { cookies } from "next/headers";

export async function Products() {
  const cookie = await cookies();
  console.log(cookie.get("token"));

  return (
    <div className="mt-20">products</div>
  );
}
