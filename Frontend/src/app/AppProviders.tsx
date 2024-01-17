import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { Toaster } from "react-hot-toast";
import GlobalStyle from "./../styles/GlobalStyle.js";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n/i18n";
import { ChakraProvider } from "@chakra-ui/react";
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
      <I18nextProvider i18n={i18n}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyle />
        <ChakraProvider>
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
        </ChakraProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
}

export default AppProviders;
