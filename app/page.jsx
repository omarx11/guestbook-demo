import FormData from "./components/FormData";
import GuestbookMessages from "./components/GuestbookMessages";

export default function HomePage() {
  return (
    <main className="m-auto mt-16 flex max-w-3xl flex-col items-center">
      <div className="mb-2 text-center">
        <h1 className="pb-4 text-6xl font-bold">Guestbook</h1>
        <h2 className="text-gray-300">
          Hey There!, This is a simple guestbook project that was made using the
          latest technologies such as Next.js, TailwindCSS, Supabase, and
          NextAuth for the user login.
        </h2>
      </div>
      <div className="flex h-[17rem] w-full items-center justify-center border-b border-slate-800">
        <FormData />
      </div>
      <GuestbookMessages />
    </main>
  );
}
