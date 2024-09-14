import type { Guestbook } from "@/app/lib/supabase/types/custom";
import { createContext, useState } from "react";

export const StatementContext = createContext<{
  comments: Guestbook[] | null;
  isCommentLoading: boolean;
  setComments: (comments: Guestbook[] | null) => void;
  removeComment: (cid: string) => void;
  addComment: (newComment: Guestbook) => void;
  setIsCommentLoading: (isUpdating: boolean) => void;
}>({
  isCommentLoading: false,
  comments: null,
  setComments: () => {},
  removeComment: () => {},
  addComment: () => {},
  setIsCommentLoading: () => {},
});

export function StatementProvider({ children }: { children: React.ReactNode }) {
  const [comments, setComments] = useState<Guestbook[] | null>(null);
  const [isCommentLoading, setIsCommentLoading] = useState<boolean>(false);

  const addComment = (newComment: Guestbook) => {
    setComments((prev) => (prev ? [newComment, ...prev] : [newComment]));
  };

  const removeComment = (cid: string) => {
    setComments((prev) =>
      prev ? prev.filter((comment: Guestbook) => comment.cid !== cid) : null
    );
  };

  return (
    <StatementContext.Provider
      value={{
        comments,
        isCommentLoading,
        setComments,
        removeComment,
        addComment,
        setIsCommentLoading,
      }}
    >
      {children}
    </StatementContext.Provider>
  );
}
