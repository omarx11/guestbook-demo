"use client";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatementProvider } from "@/app/context/statement";

const Providers = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StatementProvider>
        <SessionProvider>{children}</SessionProvider>
      </StatementProvider>
    </QueryClientProvider>
  );
};

export default Providers;
