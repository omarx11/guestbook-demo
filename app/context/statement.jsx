import { createContext, useState } from "react";

export const StatementContext = createContext();

export function StatementProvider({ children }) {
  const [comments, setComments] = useState(null);
  const [loadingComment, setLoadingComment] = useState(false);

  const removeComment = (cid) => {
    setComments((prev) => prev.filter((comment) => comment.cid !== cid));
  };

  return (
    <StatementContext.Provider
      value={{
        comments,
        loadingComment,
        setComments,
        removeComment,
        setLoadingComment,
      }}
    >
      {children}
    </StatementContext.Provider>
  );
}
