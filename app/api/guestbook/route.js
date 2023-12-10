import { getCurrentUser } from "@/app/lib/session";
import { createClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
    {
      db: { schema: "public" },
    },
  );

  try {
    const { data, error } = await supabase
      .from("guestbook_demo")
      .select()
      .order("created_at", { ascending: false });

    return new Response(JSON.stringify(data));
  } catch (error) {
    console.log("error", error);
    return new Response("error");
  }
}

export async function POST(req) {
  const { comment } = await req.json();
  const userData = await getCurrentUser();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
    {
      db: { schema: "public" },
    },
  );

  const body = {
    name: userData.name,
    uid: userData.id,
    cid: nanoid(),
    comment: comment,
    profile: userData.url,
    avatar: userData.image,
  };

  try {
    const { data, error } = await supabase
      .from("guestbook_demo")
      .insert(body)
      .select()
      .single();

    return new Response(JSON.stringify(data));
  } catch (error) {
    console.error("error", error);
    return new Response("error");
  }
}

export async function DELETE(req) {
  const { uid, cid } = await req.json();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
    {
      db: { schema: "public" },
    },
  );

  try {
    const { error } = await supabase
      .from("guestbook_demo")
      .delete()
      .eq("uid", uid)
      .eq("cid", cid)
      .single();

    return new Response("row deleted successfully");
  } catch (error) {
    console.error("error", error);
    return new Response("error deleting row");
  }
}
