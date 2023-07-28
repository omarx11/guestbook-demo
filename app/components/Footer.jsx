"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="my-8 flex w-full items-center justify-between rounded-md bg-neutral-900 p-2">
      <p className="select-none text-xs text-stone-500">
        {new Date().getFullYear()} ©{" "}
        <Link
          href="https://omar11.sa/"
          target="_blank"
          className="underline-offset-2 hover:underline"
          alt="omar11.sa home page"
        >
          Omar Abdulaziz
        </Link>{" "}
        • Made with{" "}
        <Link
          href="https://nextjs.org/"
          target="_blank"
          className="underline-offset-2 hover:underline"
          alt="Nextjs home page"
        >
          Next.js
        </Link>
      </p>
      <Link
        href="https://github.com/omarx11/guestbook-demo"
        target="_blank"
        className="flex items-center gap-1 text-stone-500 duration-150 hover:text-stone-300"
        alt="github guestbook-demo"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 16 16"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
         GitHub
      </Link>
    </div>
  );
}
