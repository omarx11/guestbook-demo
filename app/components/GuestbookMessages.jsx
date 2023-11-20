"use client";
import Image from "next/image";
import Link from "next/link";
import { StatementContext } from "@/app/context/statement";
import { getMessages } from "@/app/lib/guestbook";
import { dateStyle } from "@/app/lib/dateFormat";
import { useEffect, useContext, useState } from "react";
import { cn } from "../lib/utils";

export default function GuestbookMessages() {
  const [isNewest, setIsNewest] = useState(true);
  const { comments, setComments } = useContext(StatementContext);

  useEffect(() => {
    (async () => {
      const data = await getMessages();
      setComments(data);
    })();
  }, []);

  return (
    <>
      <div className="mb-2 flex w-full items-end justify-between">
        <p className="ml-1 text-neutral-200">
          {comments ? (
            comments.length
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              className="inline animate-spin"
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
          )}{" "}
          - Comments
        </p>
        <div className="flex gap-2 rounded-md bg-neutral-800 p-1 text-sm">
          <button
            className="rounded-md px-2 py-1 hover:bg-neutral-700 disabled:bg-neutral-600"
            disabled={!isNewest}
            onClick={(e) => setIsNewest(false)}
          >
            Oldest
          </button>
          <button
            className="rounded-md px-2 py-1 hover:bg-neutral-700 disabled:bg-neutral-600"
            disabled={isNewest}
            onClick={(e) => setIsNewest(true)}
          >
            Newest
          </button>
        </div>
      </div>
      <ul
        className={cn(
          "fade-in flex w-full flex-col border-t-[16px] border-double border-neutral-800/50 px-0 pt-8 md:px-2",
          {
            "flex-col": isNewest,
            "flex-col-reverse": !isNewest,
          },
        )}
        id="guestbook"
      >
        {comments ? (
          comments.map(
            ({ name, profile, comment, avatar, created_at }, index) => (
              <li
                key={index}
                className="flex flex-row items-start gap-3 rounded-md px-1 py-4 duration-100 hover:bg-neutral-800 md:px-2"
              >
                {profile ? (
                  <Link href={profile} target="_blank">
                    <Image
                      src={avatar}
                      width={42}
                      height={42}
                      className="min-w-[42px] select-none rounded-full bg-neutral-500 ring-4 ring-emerald-700/50 duration-150 drag-none"
                      alt={name + " avatar"}
                    />
                  </Link>
                ) : (
                  <Image
                    src={avatar}
                    width={42}
                    height={42}
                    className="select-none rounded-full bg-neutral-500 drag-none"
                    alt={name + " avatar"}
                  />
                )}
                <div className="overflow-hidden">
                  <p className="whitespace-pre-wrap text-neutral-200">
                    {comment}
                  </p>
                  <div className="flex select-none flex-wrap items-center text-sm text-neutral-500 md:text-base">
                    <p>{name}</p>
                    <span className="mx-0.5 text-neutral-600">/</span>
                    <p className="flex text-xs">{dateStyle(created_at)}</p>
                  </div>
                </div>
              </li>
            ),
          )
        ) : (
          <ul className="fade-in w-full list-none space-y-2 px-4">
            {[...Array(6).keys()].map((i) => (
              <li key={i}>
                <span
                  className="inline-block h-16 w-full animate-pulse rounded-md bg-neutral-800/50"
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
    </>
  );
}
