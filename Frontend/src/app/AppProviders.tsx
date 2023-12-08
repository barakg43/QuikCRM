import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5,
    },
  },
});
type AppProvidersType = { children: React.ReactElement };

function AppProviders({ children }: AppProvidersType) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster
        position='top-center'
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={
          {
            //   success: {
            //     duration: 3000,
            //   },
            //   error: {
            //     duration: 5000,
            //   },
            //   style: {
            //     fontSize: "16px",
            //     maxWidth: "500px",
            //     padding: "16px 24px",
            //     backgroundColor: "var(--color-grey-0)",
            //     color: "var(--color-grey-700) ",
            //   },
          }
        }
      />
      {children}
    </QueryClientProvider>
  );
}

export default AppProviders;
