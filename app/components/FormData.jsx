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
  const [isLoading, setIsLoading] = useState("");
  const { setComments } = useContext(StatementContext);

  const handleSubmit = async (e) => {
    setText("");
    setIsLoading("SEND");
    if (session && session.user) {
      const message = await postMessages(text);
      setComments((prev) => [message, ...prev]);
    }
    setIsLoading("");
  };

  useEffect(() => {
    text.length >= 2000 ? setWordLimit(true) : setWordLimit(false);
    text === "" ? setIsTyping(true) : setIsTyping(false);
  }, [text]);

  if (status === "loading")
    return (
      <span className="h-24 w-96 animate-pulse rounded-md bg-neutral-800"></span>
    );

  return status === "authenticated" ? (
    <div className="mx-4 w-full md:w-2/3">
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
        // remove highlight-white/5 scrollbar
        className={
          wordLimit
            ? "highlight-white/5 scrollbar h-36 w-full resize-none rounded-md bg-gray-800 p-2 text-sm caret-rose-500 shadow-sm ring-0 ring-gray-900/10 placeholder:italic focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
            : "highlight-white/5 scrollbar h-36 w-full resize-none rounded-md bg-gray-800 p-2 text-sm caret-violet-500 shadow-sm ring-0 ring-gray-900/10 placeholder:italic focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
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
            {isLoading === "SEND" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="animate-spin"
              >
                <g fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14Zm0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Z"
                    clipRule="evenodd"
                    opacity=".2"
                  />
                  <path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7H2Z" />
                </g>
              </svg>
            )}
          </button>
          <button
            aria-label="Sign out"
            onClick={() => {
              signOut();
              setIsLoading("SignOut");
            }}
            className="flex items-center gap-1 rounded-md bg-rose-800 px-2 py-1 text-base duration-100 hover:bg-rose-900"
          >
            Sign Out
            {isLoading === "SignOut" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="animate-spin"
              >
                <g fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14Zm0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Z"
                    clipRule="evenodd"
                    opacity=".2"
                  />
                  <path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7H2Z" />
                </g>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <SigninButton />
  );
}
