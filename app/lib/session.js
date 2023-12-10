"use server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/authOptions";

export async function getCurrentUser() {
  // Get the user session from the server
  const session = await getServerSession(authOptions);
  return session?.user;
}
