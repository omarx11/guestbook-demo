"use client";
import Image from "next/image";
import { StatementContext } from "@/app/context/statement";
import { getMessages } from "@/app/lib/guestbook";
import { dateStyle } from "@/app/lib/dateFormat";
import { useEffect, useContext } from "react";

export default function GuestbookMessages() {
  const { comments, setComments } = useContext(StatementContext);

  useEffect(() => {
    (async () => {
      const data = await getMessages();
      setComments(data);
    })();
  }, []);

  return (
    <ul className="fade-in mt-4 w-full border-t border-slate-800 px-2 pt-2">
      {comments ? (
        comments.map(({ name, comment, avatar, created_at }, index) => (
          <li
            key={index}
            className="flex flex-row items-start gap-3 rounded-lg px-2 py-4 duration-100 hover:bg-gray-800 hover:drop-shadow-md"
          >
            <Image
              src={avatar}
              width={42}
              height={42}
              className="select-none rounded-full drag-none"
              alt={name + " avatar"}
            />
            <div className="overflow-hidden">
              <p className="whitespace-pre-wrap text-stone-200">{comment}</p>
              <div className="flex select-none flex-wrap items-center">
                <p className="text-gray-400">{name}</p>
                <span className="mx-1 text-gray-700">/</span>
                <div className="flex text-sm text-gray-500">
                  {dateStyle(created_at)}
                </div>
              </div>
            </div>
          </li>
        ))
      ) : (
        <ul className="fade-in w-full list-none space-y-2 px-4">
          {[...Array(6).keys()].map((i) => (
            <li key={i}>
              <span
                className="inline-block h-16 w-full animate-pulse rounded-md bg-gray-800/90"
                style={{
                  animationDelay: `${i * 0.05}s`,
                  animationDirection: "1s",
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </ul>
  );
}
