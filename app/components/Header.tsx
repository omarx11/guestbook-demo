import Link from "next/link";

export default function Header() {
  return (
    <div className="mx-2 mb-2 w-full max-w-[840px] text-center">
      <h1 className="relative pb-4 text-4xl font-bold sm:text-6xl">
        Guestbook
        <span className="absolute bottom-[18px] ml-2 select-none text-sm text-sky-400 sm:text-base">
          {" "}
          Demo
        </span>
      </h1>
      <p className="text-sm text-gray-300 sm:text-base">
        Welcome! This is a guestbook demo project built using{" "}
        <Link
          href="https://nextjs.org/"
          target="_blank"
          className="hover:underline"
        >
          Next.js 14
        </Link>{" "}
        and{" "}
        <Link
          href="https://tailwindcss.com/"
          target="_blank"
          className="hover:underline"
        >
          TailwindCSS
        </Link>
        , with{" "}
        <Link
          href="https://www.typescriptlang.org/"
          target="_blank"
          className="hover:underline"
        >
          TypeScript
        </Link>{" "}
        for type safety. It utilizes{" "}
        <Link
          href="https://supabase.com/"
          target="_blank"
          className="hover:underline"
        >
          Supabase
        </Link>{" "}
        and server actions to securely handle data interactions.
      </p>
    </div>
  );
}
