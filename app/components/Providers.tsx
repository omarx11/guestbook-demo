"use client";

import { StatementProvider } from "@/app/context/statement";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Providers: FC<LayoutProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StatementProvider>{children}</StatementProvider>
    </QueryClientProvider>
  );
};

export default Providers;
