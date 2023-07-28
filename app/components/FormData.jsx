"use client";
import Image from "next/image";
import { StatementContext } from "@/app/context/statement";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect, useContext } from "react";
import { postMessages } from "@/app/lib/guestbook";
import SigninButton from "./SigninButton";

export default function FormData() {
  const { data: session, status } = useSession();
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [wordLimit, setWordLimit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setComments } = useContext(StatementContext);

  const handleSubmit = async (e) => {
    setText("");
    setIsLoading(true);
    if (session && session.user) {
      const data = await postMessages(text);
      setComments((prev) => [data, ...prev]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    text.length >= 2000 ? setWordLimit(true) : setWordLimit(false);
    text === "" ? setIsTyping(true) : setIsTyping(false);
  }, [text]);

  return status === "authenticated" ? (
    <div className="w-2/3">
      <div className="flex select-none items-center gap-2">
        <Image
          src={session.user.image}
          width={26}
          height={26}
          className="mb-2 rounded-full drag-none"
          alt="user-avatar"
        />
        <p className="text-sm text-gray-500">type as {session.user.name}</p>
      </div>
      <textarea
        name="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={2000}
        placeholder="Leave a message.."
        spellCheck={false}
        className={
          wordLimit
            ? "scroll highlight-white/5 h-36 w-full resize-none rounded-md bg-slate-800 p-2 text-sm caret-rose-500 shadow-sm ring-0 ring-slate-900/10 placeholder:italic focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
            : "highlight-white/5 h-36 w-full resize-none rounded-md bg-slate-800 p-2 text-sm caret-green-500 shadow-sm ring-0 ring-slate-900/10 placeholder:italic focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500"
        }
      />
      <div className="flex flex-wrap justify-between">
        <span
          className={
            wordLimit
              ? "select-none text-sm text-rose-500"
              : "select-none text-sm text-gray-500"
          }
        >
          {text.length} / 2000
        </span>
        <div className="flex gap-4">
          <button
            aria-label="Post Comment"
            disabled={isTyping}
            onClick={handleSubmit}
            className="flex items-center gap-1 rounded-md bg-sky-800 px-2 py-1 text-base duration-100 hover:bg-sky-900 disabled:cursor-default disabled:select-none disabled:opacity-60"
          >
            SEND
            {isLoading && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="animate-spin"
              >
                <g fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14Zm0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Z"
                    clip-rule="evenodd"
                    opacity=".2"
                  />
                  <path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7H2Z" />
                </g>
              </svg>
            )}
          </button>
          <button
            aria-label="Sign out"
            onClick={() => signOut()}
            className="rounded-md bg-rose-800 px-2 py-1 text-base duration-100 hover:bg-rose-900"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  ) : (
    <SigninButton />
  );
}
