import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      //   [baseApi.reducerPath]: baseApi.reducer,

      auth: authSlice,
    },
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware({
    //     serializableCheck: {
    //       ignoredActions: ["fileUpload/setFile"],
    //       ignoredPaths: ["fileUpload.file"],
    //     },
    //   }).concat(baseApi.middleware),

    devTools: process.env.NODE_ENV !== "production",
  });
};
export const store = makeStore();
// Infer the type of makeStore
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
