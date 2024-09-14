"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import { Provider } from "@supabase/supabase-js";
import { getURL } from "@/app/lib/helpers";

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function oAuthSignIn(provider: Provider) {
  if (!provider) {
    return redirect("/error");
  }

  const supabase = createClient();
  const redirectUrl = getURL("/auth/callback");
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl,
    },
  });

  if (error) {
    throw new Error(`Could not authenticate user: ${error}`);
  }

  return redirect(data.url ?? "");
}
