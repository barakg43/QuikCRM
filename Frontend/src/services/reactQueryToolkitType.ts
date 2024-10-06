import { DefaultError, UseMutateFunction } from "@tanstack/react-query";

import { SafePromise } from "./tsHelpers";
import { HasRequiredProps, OmitFromUnion, UnwrapPromise } from "./tsHelpers.d";
/* eslint-disable @typescript-eslint/no-explicit-any */
export enum DefinitionType {
  query = "query",
  mutation = "mutation",
}
declare const resultType: unique symbol;
declare const baseQuery: unique symbol;
export const reactHooksModuleName = /* @__PURE__ */ Symbol();
export type ReactHooksModule = typeof reactHooksModuleName;
type QueryKey = import("@tanstack/react-query").QueryKey;

export type QueryDefinition<
  QueryArg,
  BaseQuery extends BaseQueryFn,
  ResultType,
  TQueryKey extends QueryKey = QueryKey
> = BaseEndpointDefinition<QueryArg, BaseQuery, ResultType> &
  QueryExtraOptions<TQueryKey, ResultType, QueryArg>;
export type MutationDefinition<
  QueryArg,
  BaseQuery extends BaseQueryFn,
  ResultType,
  TQueryKey extends QueryKey = QueryKey
> = BaseEndpointDefinition<QueryArg, BaseQuery, ResultType> &
  MutationExtraOptions<TQueryKey, ResultType, QueryArg>;

export type BaseQueryResult<BaseQuery extends BaseQueryFn> = UnwrapPromise<
  ReturnType<BaseQuery>
>;
// > extends infer Unwrapped
//   ? Unwrapped extends { data: any }
//     ? Unwrapped["data"]
//     : never
//   : never;

// export type BaseQueryError<BaseQuery extends BaseQueryFn> = Exclude<
//   UnwrapPromise<ReturnType<BaseQuery>>,
//   { error?: undefined }
// >["error"];

//   | ([CastAny<BaseQueryResult<BaseQuery>, {}>] extends [NEVER]
//     ? never
//     : EndpointDefinitionWithQuery<QueryArg, BaseQuery, ResultType>)
// | EndpointDefinitionWithQueryFn<QueryArg, BaseQuery, ResultType>
// )
export type BaseEndpointDefinition<
  QueryArg,
  BaseQuery extends BaseQueryFn,
  ResultType
> = EndpointDefinitionWithQuery<QueryArg, BaseQuery, ResultType> & {
  [resultType]?: ResultType;
  [baseQuery]?: BaseQuery;
} & HasRequiredProps<
    BaseQueryExtraOptions<BaseQuery>,
    { extraOptions: BaseQueryExtraOptions<BaseQuery> },
    { extraOptions?: BaseQueryExtraOptions<BaseQuery> }
  >;

export interface BaseQueryApi {
  signal?: AbortSignal;
  //   abort: (reason?: string) => void;
  //   dispatch: (a: unknown, b: unknown, c: unknown) => void;
  //   getState: () => unknown;
  //   extra: unknown;
  //   endpoint: string;
  //   type: "query" | "mutation";
  /**
   * Only available for queries: indicates if a query has been forced,
   * i.e. it would have been fetched even if there would already be a cache entry
   * (this does not mean that there is already a cache entry though!)
   *
   * This can be used to for example add a `Cache-Control: no-cache` header for
   * invalidated queries.
   */
  //   forced?: boolean;
}

export type QueryArgFn<QueryArg, BaseQuery extends BaseQueryFn> = (
  queryArg: QueryArg
) => BaseQueryArg<BaseQuery>;
interface EndpointDefinitionWithQuery<
  QueryArg,
  BaseQuery extends BaseQueryFn,
  ResultType
> {
  /**
   * `query` can be a function that returns either a `string` or an `object` which is passed to your `baseQuery`. If you are using [fetchBaseQuery](./fetchBaseQuery), this can return either a `string` or an `object` of properties in `FetchArgs`. If you use your own custom [`baseQuery`](../../rtk-query/usage/customizing-queries), you can customize this behavior to your liking.
   *
   * @example
   *
   * ```ts
   * // codeblock-meta title="query example"
   *
   * import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CastAny, HasRequiredProps } from './tsHelpers';
   * interface Post {
   *   id: number
   *   name: string
   * }
   * type PostsResponse = Post[]
   *
   * const api = createApi({
   *   baseQuery: fetchBaseQuery({ baseUrl: '/' }),
   *   tagTypes: ['Post'],
   *   endpoints: (build) => ({
   *     getPosts: build.query<PostsResponse, void>({
   *       // highlight-start
   *       query: () => 'posts',
   *       // highlight-end
   *     }),
   *     addPost: build.mutation<Post, Partial<Post>>({
   *      // highlight-start
   *      query: (body) => ({
   *        url: `posts`,
   *        method: 'POST',
   *        body,
   *      }),
   *      // highlight-end
   *      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
   *    }),
   *   })
   * })
   * ```
   */
  query(arg: QueryArg): BaseQueryArg<BaseQuery>;
  //   queryFn?: never;
  /**
   * A function to manipulate the data returned by a query or mutation.
   */
  transformResponse?(
    baseQueryReturnValue: BaseQueryResult<BaseQuery>,
    arg: QueryArg
  ): ResultType | Promise<ResultType>;
  //   a: TransformedResponse<QueryArg, BaseQuery, ResultType>;
  //    * A function to manipulate the data returned by a failed query or mutation.
  //    */
}
interface SerializedError {
  name?: string;
  message?: string;
  stack?: string;
  code?: string;
}
type QueryArgFrom<D extends BaseEndpointDefinition<any, any, any>> =
  D extends BaseEndpointDefinition<infer QA, any, any> ? QA : unknown;
type ResultTypeFrom<D extends BaseEndpointDefinition<any, any, any>> =
  D extends BaseEndpointDefinition<any, any, infer RT> ? RT : unknown;

type QueryKeyTypeFrom<D extends EndpointDefinition<any, any, any, any>> =
  D extends EndpointDefinition<any, any, any, infer QK> ? QK : unknown;

// export type UseQuery<D extends QueryDefinition<any, any, any, any>> = <
//   R extends Record<string, any> = UseQueryStateDefaultResult<D>
// >(
//   arg: QueryArgFrom<D>
// ) => UseQueryHookResult<D, R>;

export type QueryReturnValue<TData = unknown> = {
  data: TData;
};

export type EndpointName = keyof Omit<
  BuildMutationHook<any, any, any, any>,
  "baseQuery"
>;
type SubscriptionOptions = {
  /**
   * How frequently to automatically re-fetch data (in milliseconds). Defaults to `0` (off).
   */
  pollingInterval?: number;
  /**
   *  Defaults to 'false'. This setting allows you to control whether RTK Query will continue polling if the window is not focused.
   *
   *  If pollingInterval is not set or set to 0, this **will not be evaluated** until pollingInterval is greater than 0.
   *
   *  Note: requires [`setupListeners`](./setupListeners) to have been called.
   */
  skipPollingIfUnfocused?: boolean;
  /**
   * Defaults to `false`. This setting allows you to control whether RTK Query will try to refetch all subscribed queries after regaining a network connection.
   *
   * If you specify this option alongside `skip: true`, this **will not be evaluated** until `skip` is false.
   *
   * Note: requires [`setupListeners`](./setupListeners) to have been called.
   */
  refetchOnReconnect?: boolean;
  /**
   * Defaults to `false`. This setting allows you to control whether RTK Query will try to refetch all subscribed queries after the application window regains focus.
   *
   * If you specify this option alongside `skip: true`, this **will not be evaluated** until `skip` is false.
   *
   * Note: requires [`setupListeners`](./setupListeners) to have been called.
   */
  refetchOnFocus?: boolean;
};

interface UseQuerySubscriptionOptions extends SubscriptionOptions {
  /**
   * Prevents a query from automatically running.
   *
   * @remarks
   * When `skip` is true (or `skipToken` is passed in as `arg`):
   *
   * - **If the query has cached data:**
   *   * The cached data **will not be used** on the initial load, and will ignore updates from any identical query until the `skip` condition is removed
   *   * The query will have a status of `uninitialized`
   *   * If `skip: false` is set after the initial load, the cached result will be used
   * - **If the query does not have cached data:**
   *   * The query will have a status of `uninitialized`
   *   * The query will not exist in the state when viewed with the dev tools
   *   * The query will not automatically fetch on mount
   *   * The query will not automatically run when additional components with the same query are added that do run
   *
   * @example
   * ```tsx
   * // codeblock-meta no-transpile title="Skip example"
   * const Pokemon = ({ name, skip }: { name: string; skip: boolean }) => {
   *   const { data, error, status } = useGetPokemonByNameQuery(name, {
   *     skip,
   *   });
   *
   *   return (
   *     <div>
   *       {name} - {status}
   *     </div>
   *   );
   * };
   * ```
   */
  skip?: boolean;
  /**
   * Defaults to `false`. This setting allows you to control whether if a cached result is already available, RTK Query will only serve a cached result, or if it should `refetch` when set to `true` or if an adequate amount of time has passed since the last successful query result.
   * - `false` - Will not cause a query to be performed _unless_ it does not exist yet.
   * - `true` - Will always refetch when a new subscriber to a query is added. Behaves the same as calling the `refetch` callback or passing `forceRefetch: true` in the action creator.
   * - `number` - **Value is in seconds**. If a number is provided and there is an existing query in the cache, it will compare the current time vs the last fulfilled timestamp, and only refetch if enough time has elapsed.
   *
   * If you specify this option alongside `skip: true`, this **will not be evaluated** until `skip` is false.
   */
  refetchOnMountOrArgChange?: boolean | number;
}
export type BaseQueryMeta<BaseQuery extends BaseQueryFn> = UnwrapPromise<
  ReturnType<BaseQuery>
>["meta"];

type MutationActionCreatorResult<
  D extends MutationDefinition<any, any, any, any>
> = SafePromise<
  | {
      data: ResultTypeFrom<D>;
      error?: undefined;
    }
  | {
      data?: undefined;
      error:
        | Exclude<
            BaseQueryError<
              D extends MutationDefinition<any, infer BaseQuery, any, any>
                ? BaseQuery
                : never
            >,
            undefined
          >
        | SerializedError;
    }
> & {
  /** @internal */
  arg: {
    /**
     * The name of the given endpoint for the mutation
     */
    endpointName: string;
    /**
     * The original arguments supplied to the mutation call
     */
    originalArgs: QueryArgFrom<D>;
    /**
     * Whether the mutation is being tracked in the store.
     */
    track?: boolean;
    fixedCacheKey?: string;
  };
  /**
   * A unique string generated for the request sequence
   */
  requestId: string;
  /**
   * A method to cancel the mutation promise. Note that this is not intended to prevent the mutation
   * that was fired off from reaching the server, but only to assist in handling the response.
   *
   * Calling `abort()` prior to the promise resolving will force it to reach the error state with
   * the serialized error:
   * `{ name: 'AbortError', message: 'Aborted' }`
   *
   * @example
   * ```ts
   * const [updateUser] = useUpdateUserMutation();
   *
   * useEffect(() => {
   *   const promise = updateUser(id);
   *   promise
   *     .unwrap()
   *     .catch((err) => {
   *       if (err.name === 'AbortError') return;
   *       // else handle the unexpected error
   *     })
   *
   *   return () => {
   *     promise.abort();
   *   }
   * }, [id, updateUser])
   * ```
   */
  abort(): void;
  /**
   * Unwraps a mutation call to provide the raw response/error.
   *
   * @remarks
   * If you need to access the error or success payload immediately after a mutation, you can chain .unwrap().
   *
   * @example
   * ```ts
   * // codeblock-meta title="Using .unwrap"
   * addPost({ id: 1, name: 'Example' })
   *   .unwrap()
   *   .then((payload) => console.log('fulfilled', payload))
   *   .catch((error) => console.error('rejected', error));
   * ```
   *
   * @example
   * ```ts
   * // codeblock-meta title="Using .unwrap with async await"
   * try {
   *   const payload = await addPost({ id: 1, name: 'Example' }).unwrap();
   *   console.log('fulfilled', payload)
   * } catch (error) {
   *   console.error('rejected', error);
   * }
   * ```
   */
  unwrap(): Promise<ResultTypeFrom<D>>;
  /**
     * A method to manually unsubscribe from the mutation call, meaning it will be removed from cache after the usual caching grace period.
     The value returned by the hook will reset to `isUninitialized` afterwards.
     */
  reset(): void;
};

export type MutationTrigger<D extends MutationDefinition<any, any, any, any>> =
  {
    /**
     * Triggers the mutation and returns a Promise.
     * @remarks
     * If you need to access the error or success payload immediately after a mutation, you can chain .unwrap().
     *
     * @example
     * ```ts
     * // codeblock-meta title="Using .unwrap with async await"
     * try {
     *   const payload = await addPost({ id: 1, name: 'Example' }).unwrap();
     *   console.log('fulfilled', payload)
     * } catch (error) {
     *   console.error('rejected', error);
     * }
     * ```
     */
    (arg: QueryArgFrom<D>): MutationActionCreatorResult<D>;
  };

// export type UsedMutationHookFn<
//   D extends MutationDefinition<any, any, any, any>
// > =
//   //<   R extends Record<string, any> = MutationResultSelectorResult<D>
//   // >() =>
//   //   options?: UseMutationStateOptions<D, R>
//   () => readonly [
//     UseMutateFunction<
//       QueryReturnValue<unknown, unknown>,
//       Error,
//       QueryArgFrom<D>,
//       unknown
//     >,
//     boolean
//   ];

export type UseMutation<QueryArg, ResultType> = () => readonly [
  UseMutateFunction<unknown, unknown, QueryArg, unknown>,
  boolean
];
export type ToolkitHookFunction<QueryArg, ResultType> =
  | UseQuery<QueryArg, ResultType>
  | UseMutation<QueryArg, ResultType>;
/**
   
}


// interface EndpointDefinitionWithQueryFn<
//   QueryArg,
//   BaseQuery extends BaseQueryFn,
//   ResultType
// > {
//   /**
//    * Can be used in place of `query` as an inline function that bypasses `baseQuery` completely for the endpoint.
//    *
//    * @example
//    * ```ts
//    * // codeblock-meta title="Basic queryFn example"
//    *
//    * import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
//    * interface Post {
//    *   id: number
//    *   name: string
//    * }
//    * type PostsResponse = Post[]
//    *
//    * const api = createApi({
//    *   baseQuery: fetchBaseQuery({ baseUrl: '/' }),
//    *   endpoints: (build) => ({
//    *     getPosts: build.query<PostsResponse, void>({
//    *       query: () => 'posts',
//    *     }),
//    *     flipCoin: build.query<'heads' | 'tails', void>({
//    *       // highlight-start
//    *       queryFn(arg, queryApi, extraOptions, baseQuery) {
//    *         const randomVal = Math.random()
//    *         if (randomVal < 0.45) {
//    *           return { data: 'heads' }
//    *         }
//    *         if (randomVal < 0.9) {
//    *           return { data: 'tails' }
//    *         }
//    *         return { error: { status: 500, statusText: 'Internal Server Error', data: "Coin landed on its edge!" } }
//    *       }
//    *       // highlight-end
//    *     })
//    *   })
//    * })
//    * ```
//    */
//   queryFn(
//     arg: QueryArg,
//     api: BaseQueryApi,
//     extraOptions: BaseQueryExtraOptions<BaseQuery>,
//     baseQuery: (arg: Parameters<BaseQuery>[0]) => ReturnType<BaseQuery>
//   ): MaybePromise<
//     QueryReturnValue<
//       ResultType,
//       BaseQueryError<BaseQuery>,
//       BaseQueryMeta<BaseQuery>
//     >
//   >;
//   query?: never;
//   transformResponse?: never;
//   transformErrorResponse?: never;
//   /**
//    * Defaults to `true`.
//    *
//    * Most apps should leave this setting on. The only time it can be a performance issue
//    * is if an API returns extremely large amounts of data (e.g. 10,000 rows per request) and
//    * you're unable to paginate it.
//    *
//    * For details of how this works, please see the below. When it is set to `false`,
//    * every request will cause subscribed components to rerender, even when the data has not changed.
//    *
//    * @see https://redux-toolkit.js.org/api/other-exports#copywithstructuralsharing
//    */
//   structuralSharing?: boolean;
// }

export type BaseQueryFn<
  Args = any,
  Result = unknown,
  DefinitionExtraOptions = Record<string, never> | unknown
> = (
  args: Args,
  api: BaseQueryApi,
  extraOptions: DefinitionExtraOptions
) => MaybePromise<Result>;

type MaybePromise<T> = T | Promise<T> | (T extends any ? Promise<T> : never);
export type BaseQueryArg<T extends (arg: any, ...args: any[]) => any> =
  T extends (arg: infer A, ...args: any[]) => any ? A : any;
export type BaseQueryExtraOptions<BaseQuery extends BaseQueryFn> =
  Parameters<BaseQuery>[2];

declare const _NEVER: unique symbol;
export type NEVER = typeof _NEVER;

export type PrefetchQueryType<QueryArg> = {
  args: QueryArg;
};
export interface QueryExtraOptions<
  TQueryKey extends QueryKey,
  ResultType,
  QueryArg
  //   BaseQuery extends BaseQueryFn,
  //   ReducerPath extends string = string
> {
  type: DefinitionType.query;
  /**
   * Used by `query` endpoints. Determines which 'key' is attached to the cached data returned by the query.
   * Expects an array of tag type strings, an array of objects of tag types with ids, or a function that returns such an array.
   *
   * Simple Query Keys:
   * 1. `['Post']`
   * 2. `['something', 'special']`
   *
   *  Array Keys with variables:
   * 1.  `() => ['todo', 5]`
   * 2.  `() => ['todo', 5, { preview: true }]`
   * 3.  `(arg:{ status, page }) =>  ['todos', { status, page }]` - equivalent to `4`
   * 4.  `(arg:{ status, page }) =>  ['todos', { page, status }]` - equivalent to `3`
   * 5.  `(arg:{ status, page }) =>  ['todos', { page, status, other: undefined }]` - equivalent to `3`,`4`
   *
   * @example
   *
   * ```ts
   * // codeblock-meta title="providesTags example"
   *
   * import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
   * interface Post {
   *   id: number
   *   name: string
   * }
   * type PostsResponse = Post[]
   *
   * const api = createApi({
   *   baseQuery: fetchBaseQuery({ baseUrl: '/' }),
   *   endpoints: (build) => ({
   *     getPosts: build.query<PostsResponse, void>({
   *       query: ({page}) => `posts&page=${page}`,
   *       // highlight-start
   *       providesQueryKeys: (args:{page}) =>
   *         ["posts",{ type: 'Posts'},page],
   *       // highlight-end
   *     })
   *   })
   * })
   * ```
   */
  providesQueryKeys: (args: QueryArg) => TQueryKey;
  autoCancellation?: boolean;
}
export interface MutationExtraOptions<
  TQueryKey extends QueryKey,
  ResultType,
  QueryArg
  //   BaseQuery extends BaseQueryFn,
> {
  type: DefinitionType.mutation;
  /**
   * Used by `mutation` endpoints. Determines which cached data should be either re-fetched or removed from the cache.
   * Expects the same shapes as `providesTags`.
   *
   * @example
   *
   * ```ts
   * // codeblock-meta title="invalidatesTags example"
   * import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
   * interface Post {
   *   id: number
   *   name: string
   * }
   * type PostsResponse = Post[]
   *
   * const api = createApi({
   *   baseQuery: fetchBaseQuery({ baseUrl: '/' }),
   *   tagTypes: ['Posts'],
   *   endpoints: (build) => ({
   *     getPosts: build.query<PostsResponse, void>({
   *       query: () => 'posts',
   *       providesTags: (result) =>
   *         result
   *           ? [
   *               ...result.map(({ id }) => ({ type: 'Posts' as const, id })),
   *               { type: 'Posts', id: 'LIST' },
   *             ]
   *           : [{ type: 'Posts', id: 'LIST' }],
   *     }),
   *     addPost: build.mutation<Post, Partial<Post>>({
   *       query(body) {
   *         return {
   *           url: `posts`,
   *           method: 'POST',
   *           body,
   *         }
   *       },
   *       // highlight-start
   *       invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
   *       // highlight-end
   *     }),
   *   })
   * })
   * ```
   */
  invalidatesKeys?: (args: QueryArg, result: ResultType) => TQueryKey;
}
export type EndpointBuilder<
  BaseQuery extends BaseQueryFn,
  TQueryKey extends QueryKey
> = {
  /**
   * An endpoint definition that retrieves data, and may provide tags to the cache.
   *
   * @example
   * ```js
   * // codeblock-meta title="Example of all query endpoint options"
   * const api = createApi({
   *  baseQuery,
   *  endpoints: (build) => ({
   *    getPost: build.query({
   *      query: (id) => ({ url: `post/${id}` }),
   *      // Pick out data and prevent nested properties in a hook or selector
   *      transformResponse: (response) => response.data,
   *      // Pick out error and prevent nested properties in a hook or selector
   *      transformErrorResponse: (response) => response.error,
   *      // `result` is the server response
   *      providesTags: (result, error, id) => [{ type: 'Post', id }],
   *      // trigger side effects or optimistic updates
   *      onQueryStarted(id, { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry, updateCachedData }) {},
   *      // handle subscriptions etc
   *      onCacheEntryAdded(id, { dispatch, getState, extra, requestId, cacheEntryRemoved, cacheDataLoaded, getCacheEntry, updateCachedData }) {},
   *    }),
   *  }),
   *});
   *```
   */
  query<ResultType, QueryArg = unknown>(
    definition: OmitFromUnion<
      QueryDefinition<QueryArg, BaseQuery, ResultType, TQueryKey>,
      "type"
    >
  ): QueryDefinition<QueryArg, BaseQuery, ResultType, TQueryKey>;
  /**
   * An endpoint definition that alters data on the server or will possibly invalidate the cache.
   *
   * @example
   * ```js
   * // codeblock-meta title="Example of all mutation endpoint options"
   * const api = createApi({
   *   baseQuery,
   *   endpoints: (build) => ({
   *     updatePost: build.mutation({
   *       query: ({ id, ...patch }) => ({ url: `post/${id}`, method: 'PATCH', body: patch }),
   *       // Pick out data and prevent nested properties in a hook or selector
   *       transformResponse: (response) => response.data,
   *       // Pick out error and prevent nested properties in a hook or selector
   *       transformErrorResponse: (response) => response.error,
   *       // `result` is the server response
   *       invalidatesTags: (result, error, id) => [{ type: 'Post', id }],
   *      // trigger side effects or optimistic updates
   *      onQueryStarted(id, { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry }) {},
   *      // handle subscriptions etc
   *      onCacheEntryAdded(id, { dispatch, getState, extra, requestId, cacheEntryRemoved, cacheDataLoaded, getCacheEntry }) {},
   *     }),
   *   }),
   * });
   * ```
   */
  mutation<ResultType, QueryArg>(
    definition: OmitFromUnion<
      MutationDefinition<QueryArg, BaseQuery, ResultType, TQueryKey>,
      "type"
    >
  ): MutationDefinition<QueryArg, BaseQuery, ResultType, TQueryKey>;
};

// export type UpdateDefinitions<
//   Definitions extends EndpointDefinitions,
//   NewTagTypes extends string,
//   NewDefinitions extends EndpointDefinitions
// > = {
//   [K in keyof Definitions]: Definitions[K] extends QueryDefinition<
//     infer QueryArg,
//     infer BaseQuery,
//     infer ResultType,
//     any
//   >
//     ? QueryDefinition<
//         QueryArg,
//         BaseQuery,
//         NewTagTypes,
//         TransformedResponse<NewDefinitions, K, ResultType>
//       >
//     : Definitions[K] extends MutationDefinition<
//         infer QueryArg,
//         infer BaseQuery,
//         any,
//         infer ResultType
//       >
//     ? MutationDefinition<
//         QueryArg,
//         BaseQuery,
//         NewTagTypes,
//         TransformedResponse<NewDefinitions, K, ResultType>
//       >
//     : never;
// };

export type EndpointDefinitions = Record<
  string,
  EndpointDefinition<any, any, any, any>
>;

export type EndpointDefinition<
  QueryArg,
  BaseQuery extends BaseQueryFn,
  ResultType,
  TQueryKey extends QueryKey = QueryKey
> =
  | QueryDefinition<QueryArg, BaseQuery, ResultType, TQueryKey>
  | MutationDefinition<QueryArg, BaseQuery, ResultType, TQueryKey>;

//   injectEndpoints<NewDefinitions extends EndpointDefinitions>(_: {
//     endpoints: (build: EndpointBuilder<BaseQuery, TagTypes, ReducerPath>) => NewDefinitions;
//     /**
//      * Optionally allows endpoints to be overridden if defined by multiple `injectEndpoints` calls.
//      *
//      * If set to `true`, will override existing endpoints with the new definition.
//      * If set to `'throw'`, will throw an error if an endpoint is redefined with a different definition.
//      * If set to `false` (or unset), will not override existing endpoints with the new definition, and log a warning in development.
//      */
//     overrideExisting?: boolean | 'throw';
// }): Api<BaseQuery, Definitions & NewDefinitions, ReducerPath, TagTypes, Enhancers>;
// /**
// export type Api<
//   BaseQuery extends BaseQueryFn,
//   Definitions extends EndpointDefinitions,
//   ReducerPath extends string,
//   TagTypes extends string,
//   Enhancers extends ModuleName = CoreModule,
// > = UnionToIntersection<
//   ApiModules<BaseQuery, Definitions, ReducerPath, TagTypes>[Enhancers]
// > & {
//   /**
//    * A function to inject the endpoints into the original API, but also give you that same API with correct types for these endpoints back. Useful with code-splitting.
//    */
//   injectEndpoints<NewDefinitions extends EndpointDefinitions>(_: {
//     endpoints: (
//       build: EndpointBuilder<BaseQuery, QueryKey>,
//     ) => NewDefinitions
//     /**
//      * Optionally allows endpoints to be overridden if defined by multiple `injectEndpoints` calls.
//      *
//      * If set to `true`, will override existing endpoints with the new definition.
//      * If set to `'throw'`, will throw an error if an endpoint is redefined with a different definition.
//      * If set to `false` (or unset), will not override existing endpoints with the new definition, and log a warning in development.
//      */
//     overrideExisting?: boolean | 'throw'
//   }):
//    Api<
//     BaseQuery,
//     Definitions & NewDefinitions,
//     ReducerPath,
//     TagTypes,
//     Enhancers
//   >
// }

export type Api<
  BaseQuery extends BaseQueryFn,
  //   ReducerPath extends string,
  TQueryKey extends QueryKey,
  Definitions extends EndpointDefinitions
  //   Enhancers extends ModuleName = CoreModule
> = {
  /**
   * A function to inject the endpoints into the original API, but also give you that same API with correct types for these endpoints back. Useful with code-splitting.
   */
  //   endpointDefinitions: Definitions;
  endpoints: Definitions;

  injectEndpoints<NewDefinitions extends EndpointDefinitions>(_: {
    endpoints: (build: EndpointBuilder<BaseQuery, QueryKey>) => NewDefinitions;

    /**
     * Optionally allows endpoints to be overridden if defined by multiple `injectEndpoints` calls.
     *
     * If set to `true`, will override existing endpoints with the new definition.
     * If set to `'throw'`, will throw an error if an endpoint is redefined with a different definition.
     * If set to `false` (or unset), will not override existing endpoints with the new definition, and log a warning in development.
     */
    overrideExisting?: boolean | "throw";
  }): Api<BaseQueryFn, TQueryKey, EndpointDefinitions> &
    HooksWithUniqueNames<NewDefinitions>;
  /**
   *A function to enhance a generated API with additional information. Useful with code-generation.
   */
};

// export type CreateApi<Modules extends ModuleName> = {
//   /**
//    * Creates a service to use in your application. Contains only the basic redux logic (the core module).
//    *
//    * @link https://rtk-query-docs.netlify.app/api/createApi
//    */
//   <
//     BaseQuery extends BaseQueryFn,
//     Definitions extends EndpointDefinitions,
//     ReducerPath extends string = "api",
//     TagTypes extends string = never
//   >(
//     options: CreateApiOptions<BaseQuery, Definitions, ReducerPath, TagTypes>
//   ): Api<BaseQuery, Definitions, ReducerPath, TagTypes, Modules>;
// };

export interface CreateApiOptions<
  BaseQuery extends BaseQueryFn
  //   Definitions extends EndpointDefinitions,
  //   ReducerPath extends string = "api",
  //   TQueryKey extends QueryKey
> {
  /**
   * The base query used by each endpoint if no `queryFn` option is specified. RTK Query exports a utility called [fetchBaseQuery](./fetchBaseQuery) as a lightweight wrapper around `fetch` for common use-cases. See [Customizing Queries](../../rtk-query/usage/customizing-queries) if `fetchBaseQuery` does not handle your requirements.
   *
   * @example
   *
   * ```ts
   * import { createApi, fetchBaseQuery, QueryArgFrom } from '@reduxjs/toolkit/query';
import { QueryKeys } from './redux/query/core/apiState';
import { QueryKey } from '@tanstack/react-query';
import { UnwrapPromise } from './redux/query/tsHelpers';
import { QueryArgFrom, ResultTypeFrom } from '../../node/query/endpointDefinitions';
import { Query } from '../../node/query';
import type { UseMutation from '@internal/query/react/buildHooks';
import type {EndpointDefinition from '@reduxjs/toolkit/query';
import { original } from 'immer';
   *
   * const api = createApi({
   *   // highlight-start
   *   baseQuery: fetchBaseQuery({ baseUrl: '/' }),
   *   // highlight-end
   *   endpoints: (build) => ({
   *     // ...endpoints
   *   }),
   * })
   * ```
   */
  baseQuery: BaseQuery;
}

// export type TransformedResponse<
//   NewDefinitions extends EndpointDefinitions,
//   K,
//   ResultType
// > = K extends keyof NewDefinitions
//   ? NewDefinitions[K]["transformResponse"] extends undefined
//     ? ResultType
//     : UnwrapPromise<
//         ReturnType<NonUndefined<NewDefinitions[K]["transformResponse"]>>
//       >
//   : ResultType;
export type TransformedResponse<
  QueryArg,
  BaseQuery extends BaseQueryFn,
  ResultType
> = (
  baseQueryReturnValue: BaseQueryResult<BaseQuery>,
  arg: QueryArg
) => ResultType | Promise<ResultType>;

//  (
//   baseQueryReturnValue: BaseQueryResult<BaseQuery>,
//   arg: QueryArg
// ) => ResultType | Promise<ResultType>;

export type BuildMutationHook<
  QueryArg,
  BaseQuery extends BaseQueryFn,
  ResultType,
  TQueryKey extends QueryKey
> = {
  baseQuery: BaseQuery;
  definition: EndpointDefinition<QueryArg, BaseQuery, ResultType, TQueryKey>;
};

// export interface ApiModules<
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   BaseQuery extends BaseQueryFn,
//   Definitions extends EndpointDefinitions,

// > {
//   /**
//    *  Endpoints based on the input endpoints provided to `createApi`, containing `select`, `hooks` and `action matchers`.
//    */
//   endpoints: {
//     [K in keyof Definitions]: Definitions[K] extends QueryDefinition<
//       any,
//       any,
//       any,
//       any
//     >
//       ? QueryHooks<Definitions[K]>
//       : Definitions[K] extends MutationDefinition<any, any, any, any>
//       ? MutationHooks<Definitions[K]>
//       : never;
//   } & HooksWithUniqueNames<Definitions>;
// }

export type HooksWithUniqueNames<Definitions extends EndpointDefinitions> =
  QueryHookNames<Definitions> & MutationHookNames<Definitions>;

export type UseQueryStateOptions<
  D extends QueryDefinition<any, any, any, any>,
  R extends Record<string, any>
> = {
  /**
   * Prevents a query from automatically running.
   *
   * @remarks
   * When skip is true:
   *
   * - **If the query has cached data:**
   *   * The cached data **will not be used** on the initial load, and will ignore updates from any identical query until the `skip` condition is removed
   *   * The query will have a status of `uninitialized`
   *   * If `skip: false` is set after skipping the initial load, the cached result will be used
   * - **If the query does not have cached data:**
   *   * The query will have a status of `uninitialized`
   *   * The query will not exist in the state when viewed with the dev tools
   *   * The query will not automatically fetch on mount
   *   * The query will not automatically run when additional components with the same query are added that do run
   *
   * @example
   * ```ts
   * // codeblock-meta title="Skip example"
   * const Pokemon = ({ name, skip }: { name: string; skip: boolean }) => {
   *   const { data, error, status } = useGetPokemonByNameQuery(name, {
   *     skip,
   *   });
   *
   *   return (
   *     <div>
   *       {name} - {status}
   *     </div>
   *   );
   * };
   * ```
   */
  skip?: boolean;
  /**
   * `selectFromResult` allows you to get a specific segment from a query result in a performant manner.
   * When using this feature, the component will not rerender unless the underlying data of the selected item has changed.
   * If the selected item is one element in a larger collection, it will disregard changes to elements in the same collection.
   *
   * @example
   * ```ts
   * // codeblock-meta title="Using selectFromResult to extract a single result"
   * function PostsList() {
   *   const { data: posts } = api.useGetPostsQuery();
   *
   *   return (
   *     <ul>
   *       {posts?.data?.map((post) => (
   *         <PostById key={post.id} id={post.id} />
   *       ))}
   *     </ul>
   *   );
   * }
   *
   * function PostById({ id }: { id: number }) {
   *   // Will select the post with the given id, and will only rerender if the given posts data changes
   *   const { post } = api.useGetPostsQuery(undefined, {
   *     selectFromResult: ({ data }) => ({ post: data?.find((post) => post.id === id) }),
   *   });
   *
   *   return <li>{post?.name}</li>;
   * }
   * ```
   */
  selectFromResult?: QueryStateSelector<R, D>;
};
export type TSHelpersOverride<T1, T2> = T2 extends any
  ? Omit<T1, keyof T2> & T2
  : never;

type UseQueryStateDefaultResult<D extends QueryDefinition<any, any, any, any>> =
  TSHelpersId<
    | TSHelpersOverride<
        Extract<
          UseQueryStateBaseResult<D>,
          { status: QueryStatus.uninitialized }
        >,
        { isUninitialized: true }
      >
    | TSHelpersOverride<
        UseQueryStateBaseResult<D>,
        | { isLoading: true; isFetching: boolean; data: undefined }
        | ({
            isSuccess: true;
            isFetching: true;
            error: undefined;
          } & Required<
            Pick<UseQueryStateBaseResult<D>, "data" | "fulfilledTimeStamp">
          >)
        | ({
            isSuccess: true;
            isFetching: false;
            error: undefined;
          } & Required<
            Pick<
              UseQueryStateBaseResult<D>,
              "data" | "fulfilledTimeStamp" | "currentData"
            >
          >)
        | ({ isError: true } & Required<
            Pick<UseQueryStateBaseResult<D>, "error">
          >)
      >
  > & {
    /**
     * @deprecated Included for completeness, but discouraged.
     * Please use the `isLoading`, `isFetching`, `isSuccess`, `isError`
     * and `isUninitialized` flags instead
     */
    status: QueryStatus;
  };
declare enum QueryStatus {
  uninitialized = "uninitialized",
  pending = "pending",
  fulfilled = "fulfilled",
  rejected = "rejected",
}
type UseQueryStateBaseResult<D extends QueryDefinition<any, any, any, any>> =
  QuerySubState<D> & {
    /**
     * Where `data` tries to hold data as much as possible, also re-using
     * data from the last arguments passed into the hook, this property
     * will always contain the received data from the query, for the current query arguments.
     */
    currentData?: ResultTypeFrom<D>;
    /**
     * Query has not started yet.
     */
    isUninitialized: false;
    /**
     * Query is currently loading for the first time. No data yet.
     */
    isLoading: false;
    /**
     * Query is currently fetching, but might have data from an earlier request.
     */
    isFetching: false;
    /**
     * Query has data from a successful load.
     */
    isSuccess: false;
    /**
     * Query is currently in "error" state.
     */
    isError: false;
  };

export type UseQueryHookResult<
  D extends QueryDefinition<any, any, any, any>,
  R = UseQueryStateDefaultResult<D>
> = UseQueryStateResult<D, R> & UseQuerySubscriptionResult<D>;
type QueryActionCreatorResult<D extends QueryDefinition<any, any, any, any>> =
  SafePromise<QueryResultSelectorResult<D>> & {
    arg: QueryArgFrom<D>;
    requestId: string;
    subscriptionOptions: SubscriptionOptions | undefined;
    abort(): void;
    unwrap(): Promise<ResultTypeFrom<D>>;
    unsubscribe(): void;
    refetch(): QueryActionCreatorResult<D>;
    updateSubscriptionOptions(options: SubscriptionOptions): void;
    queryCacheKey: string;
  };
export type UseQuerySubscriptionResult<
  D extends QueryDefinition<any, any, any, any>
> = Pick<QueryActionCreatorResult<D>, "refetch">;
export type UseQueryStateResult<
  _ extends QueryDefinition<any, any, any, any>,
  R
> = NoInfer<R>;
type NoInfer<T> = [T][T extends any ? 0 : never];
type QueryResultSelectorResult<
  Definition extends QueryDefinition<any, any, any, any>
> = QuerySubState<Definition> & RequestStatusFlags;
type TSHelpersId<T> = {
  [K in keyof T]: T[K];
} & {};
type WithRequiredProp<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
type QuerySubState<D extends BaseEndpointDefinition<any, any, any>> =
  TSHelpersId<
    | ({
        status: QueryStatus.fulfilled;
      } & WithRequiredProp<
        BaseQuerySubState<D>,
        "data" | "fulfilledTimeStamp"
      > & {
          error: undefined;
        })
    | ({
        status: QueryStatus.pending;
      } & BaseQuerySubState<D>)
    | ({
        status: QueryStatus.rejected;
      } & WithRequiredProp<BaseQuerySubState<D>, "error">)
    | {
        status: QueryStatus.uninitialized;
        originalArgs?: undefined;
        data?: undefined;
        error?: undefined;
        requestId?: undefined;
        endpointName?: string;
        startedTimeStamp?: undefined;
        fulfilledTimeStamp?: undefined;
      }
  >;
type BaseQuerySubState<D extends BaseEndpointDefinition<any, any, any>> = {
  /**
   * The argument originally passed into the hook or `initiate` action call
   */
  originalArgs: QueryArgFrom<D>;
  /**
   * A unique ID associated with the request
   */
  requestId: string;
  /**
   * The received data from the query
   */
  data?: ResultTypeFrom<D>;
  /**
   * The received error if applicable
   */
  error?:
    | SerializedError
    | (D extends QueryDefinition<any, infer BaseQuery, any, any>
        ? BaseQueryError<BaseQuery>
        : never);
  /**
   * The name of the endpoint associated with the query
   */
  endpointName: string;
  /**
   * Time that the latest query started
   */
  startedTimeStamp: number;
  /**
   * Time that the latest query was fulfilled
   */
  fulfilledTimeStamp?: number;
};
export type QueryHookName<K> = `use${Capitalize<K & string>}Query`;
export type MutationHookName<K> = `use${Capitalize<K & string>}Mutation`;
type QueryHookNames<Definitions extends EndpointDefinitions> = {
  [K in keyof Definitions as Definitions[K] extends {
    type: DefinitionType.query;
  }
    ? QueryHookName<K>
    : never]: UseQuery<
    // QueryArg, ResultType, TQueryKey extends QueryKey

    QueryArgFrom<Extract<Definitions[K], QueryDefinition<any, any, any, any>>>,
    ResultTypeFrom<Extract<Definitions[K], QueryDefinition<any, any, any, any>>>
  >;
};
type RequestStatusFlags =
  | {
      status: QueryStatus.uninitialized;
      isUninitialized: true;
      isLoading: false;
      isSuccess: false;
      isError: false;
    }
  | {
      status: QueryStatus.pending;
      isUninitialized: false;
      isLoading: true;
      isSuccess: false;
      isError: false;
    }
  | {
      status: QueryStatus.fulfilled;
      isUninitialized: false;
      isLoading: false;
      isSuccess: true;
      isError: false;
    }
  | {
      status: QueryStatus.rejected;
      isUninitialized: false;
      isLoading: false;
      isSuccess: false;
      isError: true;
    };

type MutationHookNames<Definitions extends EndpointDefinitions> = {
  [K in keyof Definitions as Definitions[K] extends {
    type: DefinitionType.mutation;
  }
    ? MutationHookName<K>
    : never]: UseMutation<
    Extract<Definitions[K], MutationDefinition<any, any, any, any>>
  >;
};
// export type UseMutation<D extends MutationDefinition<any, any, any, any>> =
//   () => //   options?: UseMutationStateOptions<D, R>
//   readonly [
//     arg: any, // MutationTrigger<D> TODO:fix in the future
//     boolean
//   ];
// type MutationResultSelectorResult<
//   Definition extends MutationDefinition<any, any, any, any>
// > = MutationSubState<Definition> & RequestStatusFlags;
export interface MutationHooks<
  Definition extends MutationDefinition<any, any, any, any>
> {
  useMutation: UseMutation<Definition>;
}
export interface QueryHooks<
  Definition extends QueryDefinition<any, any, any, any>
> {
  useQuery: UseQuery<Definition>;
  //   useLazyQuery: UseLazyQuery<Definition>
  //   useQuerySubscription: UseQuerySubscription<Definition>
  //   useLazyQuerySubscription: UseLazyQuerySubscription<Definition>
  //   useQueryState: UseQueryState<Definition>
}
export type UseQuery<QueryArg, ResultType, TError = string> = (
  args: QueryArg
) => QueryResult<QueryArg, ResultType, TError>;
type QueryResult<QueryArg = unknown, TData = unknown, TError = DefaultError> =
  | QueryErrorResult<QueryArg, TData, TError>
  | QuerySuccessResult<QueryArg, TData, TError>
  | QueryLoadingResult<QueryArg, TData, TError>;

export interface QueryLoadingResult<QueryArg, ResultType, TError = DefaultError>
  extends QueryObserverBaseResult<ResultType, QueryArg, TError> {
  data: undefined;
  error: null | undefined;
  isError: false;
  isLoading: true;
  //   status: "pending";
}
export interface QuerySuccessResult<QueryArg, ResultType, TError = DefaultError>
  extends QueryObserverBaseResult<ResultType, QueryArg, TError> {
  data: ResultType;
  error: undefined;
  isError: false;
  isLoading: false;
  //   status: "success";
}

export interface QueryErrorResult<QueryArg, ResultType, TError = DefaultError>
  extends QueryObserverBaseResult<ResultType, QueryArg, TError> {
  data: undefined;
  error: TError;
  isError: true;
  isLoading: false;
  //   status: "error";
}

interface QueryObserverBaseResult<ResultType, QueryArg, TError = DefaultError> {
  data: ResultType | undefined;
  error: TError | null | undefined;
  isLoading: boolean;
  isError: boolean;
  //   status: QueryStatus;
  prefetchQuery: (args: QueryArg) => void;
}
