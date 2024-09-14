"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import type { Guestbook } from "@/app/lib/supabase/types/custom";
import type { User } from "@supabase/supabase-js";
import { useState, useContext, ChangeEvent } from "react";
import { StatementContext } from "@/app/context/statement";
import { saveComment } from "@/app/lib/server-actions/comments";
import { signOut } from "@/app/lib/server-actions/login";
import { Skeleton } from "./ui/Skeleton";
import { Loading } from "./icons/Loading";
import { cn } from "@/app/lib/utils";

const FormData = ({ userData }: { userData: User }) => {
  const [textComment, setTextComment] = useState<string>("");
  const [isLoading, setIsLoading] = useState<"send" | "signout" | "">("");
  const { addComment, setIsCommentLoading } = useContext(StatementContext);

  const wordLimit = textComment.length >= 2000;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const comment = e.target.value;
    setTextComment(comment.trimStart());
  };

  const handleSubmit = async () => {
    if (!userData || !textComment.trim()) return;
    setIsCommentLoading(true);
    setTextComment("");
    setIsLoading("send");
    try {
      const content: Guestbook = await saveComment(textComment);
      addComment(content);
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsLoading("");
      setIsCommentLoading(false);
    }
  };

  return (
    <div className="my-8 w-full max-w-xl">
      <div className="mb-2 flex select-none items-center gap-2">
        {userData?.user_metadata?.avatar_url && (
          <>
            <Image
              src={userData.user_metadata.avatar_url}
              width={32}
              height={32}
              className="drag-none h-[26px] w-[26px] rounded-full bg-neutral-900"
              alt="user-avatar"
            />
            <p className="text-sm text-neutral-500">
              Typing as {"->"} {userData.user_metadata.name}
            </p>
          </>
        )}
      </div>
      <textarea
        name="textComment"
        value={textComment}
        onChange={handleChange}
        maxLength={2000}
        placeholder="Leave a comment.."
        spellCheck={false}
        className={cn(
          "h-40 w-full rounded-md border-[6px] border-neutral-900 bg-neutral-950 p-2 text-lg text-neutral-50 shadow-sm outline-0 ring-4 ring-neutral-800 duration-300 placeholder:text-sm placeholder:italic focus:bg-black",
          wordLimit
            ? "caret-rose-500 focus:ring-rose-800"
            : "caret-sky-500 focus:ring-neutral-700"
        )}
      />
      <div className="flex flex-wrap justify-between">
        <span
          className={cn(
            "select-none text-sm",
            wordLimit ? "font-bold text-rose-700" : "text-neutral-500"
          )}
        >
          {textComment.length} / 2000
        </span>
        <div className="mt-0.5 flex gap-2 text-neutral-50">
          <button
            aria-label="Send Comment"
            disabled={!textComment.trim() || !userData || wordLimit}
            onClick={handleSubmit}
            className="flex items-center gap-1 rounded-md bg-sky-800 px-2 py-1 text-base duration-100 hover:bg-sky-900 disabled:cursor-not-allowed disabled:select-none disabled:bg-sky-800 disabled:opacity-60"
          >
            SEND
            {isLoading === "send" && (
              <Loading className="animate-spin fill-white" />
            )}
          </button>
          <form action={signOut}>
            <button
              aria-label="Sign Out"
              onClick={() => setIsLoading("signout")}
              className="flex items-center gap-1 rounded-md bg-rose-800 px-2 py-1 text-base duration-100 hover:bg-rose-900"
            >
              Sign Out
              {isLoading === "signout" && (
                <Loading className="animate-spin fill-white" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(FormData), {
  loading: () => (
    <Skeleton className="my-[4.4rem] h-[158px] w-full rounded-md sm:w-[36rem]" />
  ),
  ssr: false,
});
