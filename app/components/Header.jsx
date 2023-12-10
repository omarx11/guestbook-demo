import Link from "next/link";

export default function Header() {
  return (
    <div className="mx-2 mb-2 text-center">
      <h1 className="pb-4 text-4xl font-bold sm:text-6xl">
        Guestbook
        <span className="select-none text-sm text-sky-400 sm:text-base">
          {" "}
          Demo
        </span>
      </h1>
      <p className="text-sm text-gray-300 sm:text-base">
        Hey There!, This is a simple guestbook project that was made using the
        latest technologies such as{" "}
        <Link
          href="https://nextjs.org/"
          target="_blank"
          className="hover:underline"
        >
          Next.js
        </Link>
        ,{" "}
        <Link
          href="https://tailwindcss.com/"
          target="_blank"
          className="hover:underline"
        >
          TailwindCSS
        </Link>
        ,{" "}
        <Link
          href="https://supabase.com/"
          target="_blank"
          className="hover:underline"
        >
          Supabase
        </Link>
        , and{" "}
        <Link
          href="https://authjs.dev/"
          target="_blank"
          className="hover:underline"
        >
          NextAuth.
        </Link>{" "}
        for the user login..
      </p>
    </div>
  );
}
