"use client";

import Image from "next/image";
import type { User } from "@supabase/supabase-js";
import type { Guestbook } from "@/app/lib/supabase/types/custom";
import { useEffect, useContext, useState, useCallback, useMemo } from "react";
import { StatementContext } from "@/app/context/statement";
import {
  deleteComment,
  getAllComments,
} from "@/app/lib/server-actions/comments";
import { dateStyle } from "@/app/lib/helpers";
import { LoadingDots } from "./icons/LoadingDots";
import { cn } from "@/app/lib/utils";
import { Skeleton } from "./ui/Skeleton";
import Pagination from "./Pagination";
import { Loading } from "./icons/Loading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

const Comment = ({
  user,
  userData,
  deletingCommentId,
  handleDeleteComment,
  openAlertDialog,
  setOpenAlertDialog,
}) => (
  <li className="flex flex-row items-start gap-3 rounded-md bg-neutral-950 px-1 py-4 duration-100 hover:bg-neutral-900 md:px-2">
    <Image
      src={user.avatar ?? ""}
      width={48}
      height={48}
      className="drag-none max-h-[36px] min-h-[36px] min-w-[36px] max-w-[36px] select-none rounded-full bg-neutral-800 ring-4 ring-cyan-950 sm:max-h-[42px] sm:min-h-[42px] sm:min-w-[42px] sm:max-w-[42px]"
      alt=""
    />
    <div className="w-full overflow-hidden">
      <p className="whitespace-break-spaces break-all text-neutral-200 sm:break-normal">
        {user.comment}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex select-none flex-wrap items-center text-sm text-neutral-500 md:text-base">
          <p>{user.name ? user.name : "anon"}</p>
          <span className="mx-0.5 text-neutral-600">/</span>
          <p className="flex text-xs">
            {user.created_at ? dateStyle(user.created_at) : "N/A"}
          </p>
        </div>
        {userData && userData.id === user.user_id && (
          <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
            <AlertDialogTrigger asChild>
              <div className="mr-0 min-w-max select-none sm:-mt-5 sm:mr-4">
                {deletingCommentId !== user.cid ? (
                  <button className="text-xs text-red-500/80 hover:text-red-400 sm:text-sm">
                    {`< DELETE >`}
                  </button>
                ) : (
                  <LoadingDots className="mr-4 scale-[1.6] text-red-500 sm:mr-5 sm:scale-[2]" />
                )}
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your comment from database.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="mt-2 rounded-md bg-white px-2.5 py-1.5 font-semibold text-black duration-100 hover:bg-neutral-300 sm:mt-0">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => user.cid && handleDeleteComment(user.cid)}
                  className="rounded-md bg-red-700 px-2.5 py-1.5 duration-100 hover:bg-red-800"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  </li>
);

export function GuestbookMessages({ userData }: { userData: User | null }) {
  const [isNewest, setIsNewest] = useState<boolean>(true);
  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    comments,
    isCommentLoading,
    setComments,
    removeComment,
    setIsCommentLoading,
  } = useContext(StatementContext);

  useEffect(() => {
    console.log(openAlertDialog);
  }, [openAlertDialog]);

  const commentsPerPage = 6; // Adjust this to your needs.

  const totalComments = comments?.length || 0;
  const totalPages = useMemo(
    () => Math.ceil(totalComments / commentsPerPage),
    [totalComments]
  );

  const handlePageChange = useCallback(
    (page: number) => setCurrentPage(page),
    []
  );

  const currentComments = useMemo(() => {
    if (!comments) return [];
    const sortedComments = isNewest ? comments : [...comments].reverse();
    return sortedComments.slice(
      (currentPage - 1) * commentsPerPage,
      currentPage * commentsPerPage
    );
  }, [comments, currentPage, commentsPerPage, isNewest]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data: Guestbook[] = (await getAllComments()) ?? [];
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (!comments) fetchComments();
  }, [comments, setComments]);

  const handleDeleteComment = useCallback(
    async (cid: string) => {
      try {
        setDeletingCommentId(cid);
        setIsCommentLoading(true);
        await deleteComment(cid);
        removeComment(cid);
      } catch (error) {
        console.error("Error deleting comment:", error);
      } finally {
        setIsCommentLoading(false);
        setDeletingCommentId(null);
      }
    },
    [removeComment, setIsCommentLoading]
  );

  return (
    <>
      <div className="flex w-full flex-row-reverse items-center justify-between rounded-sm border-b-8 border-neutral-900/50 bg-neutral-950 text-neutral-200 sm:flex-row">
        <p className="px-1 text-sm text-neutral-300 sm:px-2 sm:text-base">
          {comments && !isCommentLoading ? (
            <span className="text-sky-500">{comments.length}</span>
          ) : (
            <Loading className="-ml-1 inline animate-spin fill-sky-500" />
          )}{" "}
          <span className="text-neutral-400">-</span> Comments
        </p>
        <div
          className={cn(
            "flex select-none gap-2 bg-neutral-900/50 px-3 py-1 text-xs sm:text-sm",
            {
              "pointer-events-none opacity-70": !comments,
            }
          )}
        >
          <button
            className="rounded-md bg-neutral-800 px-2 py-1 hover:bg-neutral-700 disabled:pointer-events-none disabled:text-sky-400"
            disabled={isNewest}
            onClick={() => {
              setIsNewest(true);
              setCurrentPage(1);
            }}
          >
            Newest
          </button>
          <button
            className="rounded-md bg-neutral-800 px-2 py-1 hover:bg-neutral-700 disabled:pointer-events-none disabled:text-sky-400"
            disabled={!isNewest}
            onClick={() => {
              setIsNewest(false);
              setCurrentPage(1);
            }}
          >
            Oldest
          </button>
        </div>
      </div>
      <ul className="my-4 flex h-max w-full flex-col gap-1 overflow-y-auto overflow-x-hidden sm:h-[500px]">
        {comments ? (
          currentComments.map((user) => (
            <Comment
              key={user.cid}
              user={user}
              userData={userData}
              deletingCommentId={deletingCommentId}
              handleDeleteComment={handleDeleteComment}
              openAlertDialog={openAlertDialog}
              setOpenAlertDialog={setOpenAlertDialog}
            />
          ))
        ) : (
          <ul className="fade-in list-none space-y-0.5">
            {[...Array(commentsPerPage)].map((_, i) => (
              <li key={i}>
                <Skeleton className="h-20 w-full rounded-md" />
              </li>
            ))}
          </ul>
        )}
      </ul>
      {comments ? (
        <Pagination
          pages={totalPages}
          state={{ page: currentPage, window: 5 }}
          onPageChange={handlePageChange}
          className="fade-in mb-4"
          note={
            <p className="text-xs text-neutral-400">
              Data fetched from Supabase APIs. Service interruptions may affect
              display.
            </p>
          }
        />
      ) : (
        <span className="h-[52px] w-full"></span>
      )}
    </>
  );
}
