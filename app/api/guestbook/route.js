import { getCurrentUser } from "@/app/lib/session";
import { createClient } from "@supabase/supabase-js";

export async function GET(req, res) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
    {
      db: { schema: "next_auth" },
    },
  );

  try {
    const { data, error } = await supabase
      .from("guestbook")
      .select()
      .order("created_at", { ascending: false });

    return new Response(JSON.stringify(data));
  } catch (error) {
    console.log("error", error);
    return new Response("error");
  }
}

export async function POST(req, res) {
  const { data } = await req.json();
  const userData = await getCurrentUser();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
    {
      db: { schema: "next_auth" },
    },
  );

  const body = {
    name: userData.name,
    profile: userData.html_url,
    comment: data.message,
    avatar: userData.picture,
  };

  try {
    const { data, error } = await supabase
      .from("guestbook")
      .insert(body)
      .select()
      .single();

    return new Response(JSON.stringify(data));
  } catch (error) {
    console.error("error", error);
    return new Response("error");
  }
}
