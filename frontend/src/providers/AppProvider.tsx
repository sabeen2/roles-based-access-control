"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, PropsWithChildren, useEffect } from "react";

const AppProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          staleTime: 20 * 1000,
          retry: false,
        },
      },
    })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default AppProvider;
