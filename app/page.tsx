import { createClient } from "./lib/supabase/server";
import { GuestbookMessages } from "./components/GuestbookMessages";
import Header from "./components/Header";
import FormData from "./components/FormData";
import OAuthButtons from "./components/OAuthButtons";
import Footer from "./components/Footer";

export default async function HomePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Header />
      <div className="flex w-full items-center justify-center">
        {user ? <FormData userData={user} /> : <OAuthButtons />}
      </div>
      <GuestbookMessages userData={user} />
      <Footer />
    </>
  );
}
