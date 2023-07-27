import { createContext, useState } from "react";

export const StatementContext = createContext();

export function StatementProvider({ children }) {
  const [comments, setComments] = useState(null);

  return (
    <StatementContext.Provider
      value={{
        comments,
        setComments,
      }}
    >
      {children}
    </StatementContext.Provider>
  );
}
