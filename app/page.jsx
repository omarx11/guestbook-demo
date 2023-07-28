import Link from "next/link";
import FormData from "./components/FormData";
import GuestbookMessages from "./components/GuestbookMessages";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <main className="m-auto mt-10 flex max-w-3xl flex-col items-center md:mt-16">
      <div className="mx-2 mb-2 text-center">
        <h1 className="pb-4 text-5xl font-bold md:text-6xl">Guestbook</h1>
        <h2 className="text-sm text-gray-300 md:text-base">
          Hey There!, This is a simple guestbook project that was made using the
          latest technologies such as Next.js, TailwindCSS, Supabase, and
          NextAuth for the user login.
        </h2>
      </div>
      <div className="flex h-[17rem] w-full items-center justify-center">
        <FormData />
      </div>
      <GuestbookMessages />
      <Footer />
    </main>
  );
}
