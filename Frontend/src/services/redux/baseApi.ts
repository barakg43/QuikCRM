// import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { AxiosError, AxiosRequestConfig, GenericAbortSignal } from "axios";
import { httpClient } from "../axios";
import { createApi } from "../reactQueryToolkit";
import { BaseQueryFn } from "../reactQueryToolkitType";
// create a new mutex
const mutex = new Mutex();

export type AxiosBaseQuery = BaseQueryFn<
  AxiosBaseQueryProps | string,
  unknown,
  unknown
>;
export const baseQueryWithReauth: AxiosBaseQuery = async (
  args,
  //   api,
  extraOptions
) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();

  let result = await axiosBaseQuery(args);
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await axiosBaseQuery({
          url: "/auth/jwt/refresh",
          method: "POST",
        });
        if (refreshResult.data) {
          //   api.dispatch(setAuth());
          // retry the initial query
          result = await axiosBaseQuery(args);
        } else {
          //   api.dispatch(logout());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await axiosBaseQuery(args);
    }
  }
  return result;
};

export type AxiosBaseQueryProps =
  | {
      url: string;
      method?: AxiosRequestConfig["method"];
      body?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
      autoCancellation?: boolean;
    }
  | string;
const axiosBaseQuery = async (
  params: AxiosBaseQueryProps,
  signal?: GenericAbortSignal
) => {
  try {
    const requestParams =
      typeof params === "string"
        ? { url: params, method: "GET" }
        : {
            data: params.body,
            url: params.url,
            method: params.method || "GET",
            params: params.params,
            headers: params.headers,
          };

    const result = await httpClient({ ...requestParams, signal });
    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError as AxiosError;
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};

export const baseApi = createApi({ baseQuery: baseQueryWithReauth });
