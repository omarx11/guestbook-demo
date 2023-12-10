"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useContext, useState } from "react";
import { StatementContext } from "@/app/context/statement";
import { getAllComments, deleteComment } from "@/app/lib/fetchRequest";
import { dateStyle } from "@/app/lib/dateFormat";
import { useSession } from "next-auth/react";
import Pagination from "./Pagination";
import { cn } from "../lib/utils";

export default function GuestbookMessages() {
  const {
    comments,
    setComments,
    removeComment,
    loadingComment,
    setLoadingComment,
  } = useContext(StatementContext);
  const { data: session, status } = useSession();
  const [isNewest, setIsNewest] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 6; // Adjust this based on your needs

  const totalComments = comments?.length;
  const totalPages = Math.ceil(totalComments / commentsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  const currentComments = comments?.slice(
    (currentPage - 1) * commentsPerPage,
    currentPage * commentsPerPage,
  );

  useEffect(() => {
    (async () => {
      const data = await getAllComments();
      setComments(data);
    })();
  }, []);

  useEffect(() => {
    if (comments) {
      const inverseComments = [...comments].reverse();
      setComments(inverseComments);
      setCurrentPage(1);
    }
  }, [isNewest]);

  const handleDeleteComment = async (uid, cid) => {
    setLoadingComment(true);
    await deleteComment(uid, cid);
    removeComment(cid);
    setLoadingComment(false);
  };

  return (
    <>
      <div className="flex w-full items-center justify-between rounded-sm border-b-8 border-neutral-800/50 bg-neutral-900 p-1 text-neutral-200">
        <p className="ml-2 text-sm text-neutral-300">
          {comments && !loadingComment ? (
            <span className="text-base text-sky-500">{comments.length}</span>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              className="-ml-1 inline animate-spin"
            >
              <g fill="rgb(56, 189, 248)">
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
          - comments found!
        </p>
        <div
          className={cn(
            "flex select-none gap-2 rounded-md border border-neutral-700 bg-neutral-900 p-1 text-sm",
            {
              "pointer-events-none opacity-70": !comments,
            },
          )}
        >
          <button
            className="rounded-md px-2 py-1 hover:bg-neutral-800 disabled:bg-neutral-700 disabled:text-sky-300"
            disabled={!isNewest}
            onClick={(e) => setIsNewest(false)}
          >
            Oldest
          </button>
          <button
            className="rounded-md px-2 py-1 hover:bg-neutral-800 disabled:bg-neutral-700 disabled:text-sky-300"
            disabled={isNewest}
            onClick={(e) => setIsNewest(true)}
          >
            Newest
          </button>
        </div>
      </div>
      <ul className="fade-in my-4 flex w-full flex-col">
        {comments ? (
          currentComments.map((user, i) => (
            <li
              key={i}
              className="flex flex-row items-start gap-3 rounded-md px-1 py-4 duration-100 hover:bg-neutral-800 md:px-2"
            >
              {user.profile ? (
                <Link href={user.profile} target="_blank">
                  <Image
                    src={user.avatar}
                    width={48}
                    height={48}
                    className="max-h-[42px] min-h-[42px] min-w-[42px] max-w-[42px] select-none rounded-full bg-neutral-800 ring-4 ring-sky-600/50 duration-150 drag-none"
                    alt=""
                  />
                </Link>
              ) : (
                <Image
                  src={user.avatar}
                  width={48}
                  height={48}
                  className="max-h-[42px] min-h-[42px] min-w-[42px] max-w-[42px] select-none rounded-full bg-neutral-800 ring-4 ring-neutral-600 drag-none"
                  alt=""
                />
              )}
              <div className="w-full overflow-hidden">
                <p className="whitespace-pre-wrap text-neutral-200">
                  {user.comment}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex select-none flex-wrap items-center text-sm text-neutral-500 md:text-base">
                    <p>{user.name ? user.name : "anon"}</p>
                    <span className="mx-0.5 text-neutral-600">/</span>
                    <p className="flex text-xs">
                      {dateStyle(user?.created_at)}
                    </p>
                  </div>
                  {status === "authenticated" &&
                    session.user.id === user.uid && (
                      <button
                        className="min-w-max text-xs text-red-400 sm:text-sm"
                        onClick={(e) => handleDeleteComment(user.uid, user.cid)}
                      >{`[ DELETE ]`}</button>
                    )}
                </div>
              </div>
            </li>
          ))
        ) : (
          <ul className="my-4 w-full list-none space-y-2">
            {[...Array(6).keys()].map((i) => (
              <li key={i}>
                <span
                  className="inline-block w-full animate-pulse rounded-md bg-neutral-800 py-8"
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
      {comments && (
        <Pagination
          pages={totalPages}
          state={{ page: currentPage, window: 5 }}
          onPageChange={handlePageChange}
          className="mb-4 justify-center"
        />
      )}
    </>
  );
}
