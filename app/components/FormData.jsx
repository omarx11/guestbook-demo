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
  const { setComments } = useContext(StatementContext);

  const handleSubmit = async (e) => {
    setText("");
    if (session && session.user) {
      const data = await postMessages(text);
      setComments((prev) => [data, ...prev]);
    }
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
            className="rounded-md bg-sky-800 px-2 py-1 text-base duration-100 hover:bg-sky-900 disabled:cursor-default disabled:select-none disabled:opacity-60"
          >
            SEND
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
