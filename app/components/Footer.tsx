"use client";

import Link from "next/link";
import { Github } from "./icons/Github";

export default function Footer() {
  return (
    <div className="mb-2 flex w-full select-none items-center justify-between border-t-4 border-neutral-900 pt-3 sm:mb-4">
      <p className="select-none text-xs text-neutral-400">
        {new Date().getFullYear()} © develop by{" "}
        <Link
          href="https://omar11.sa/"
          target="_blank"
          className="font-bold text-emerald-700 underline-offset-2 hover:underline"
        >
          Omar Abdulaziz
        </Link>
      </p>
      <Link
        href="https://github.com/omarx11/guestbook-demo"
        target="_blank"
        className="flex items-center gap-1 text-sm text-neutral-500 duration-150 hover:text-neutral-600"
      >
        <Github />
        source
      </Link>
    </div>
  );
}
