// Getting the user session from the server

import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/lib/authOptions";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  return session?.user;
}
