import { UseMutateFunction } from "@tanstack/react-query";
import { HasRequiredProps, OmitFromUnion, UnwrapPromise } from "./tsHelpers";
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
  QueryExtraOptions<TQueryKey, QueryArg>;
export type QueryReturnValue<TData = unknown, E = unknown> =
  | {
      error: E;
      data?: undefined;
      isLoading?: boolean;
    }
  | {
      error?: undefined;
      data: TData;
      isLoading?: boolean;
    };
 
    
export type BaseQueryResult<BaseQuery extends BaseQueryFn> =
UnwrapPromise<ReturnType<BaseQuery>> extends infer Unwrapped
? Unwrapped extends { data: any }
    ? Unwrapped['data']
    : never
: never


  
export type BaseQueryError<BaseQuery extends BaseQueryFn> = Exclude<
UnwrapPromise<ReturnType<BaseQuery>>,
{ error?: undefined }
>['error']
  
export type MutationDefinition<
  QueryArg,
  BaseQuery extends BaseQueryFn,
  ResultType,
  TQueryKey extends QueryKey = QueryKey
> = BaseEndpointDefinition<QueryArg, BaseQuery, ResultType> &
  MutationExtraOptions<TQueryKey, QueryArg>;

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
  /**
   * A function to manipulate the data returned by a failed query or mutation.
   */
    transformErrorResponse?(
      baseQueryReturnValue: BaseQueryError<BaseQuery>,
    //   meta: BaseQueryMeta<BaseQuery>,
      arg: QueryArg
    ): unknown;
}

export type UsedQueryHookFn<QueryArg,ResultType>=(args:QueryArg)=>{
    isLoading: boolean;
    error: any;
    data?: undefined;
} | {
    data: {
        error: unknown;
        data?: undefined;
        isLoading?: boolean;
    } | {
        error?: undefined;
        data: unknown;
        isLoading?: boolean;
    } | undefined;
    isLoading: boolean;
    error?: undefined;
}

export type UsedMutationHookFn<QueryArg,ResultType>=(args:QueryArg)=> {
    [mutateFnName: string]: boolean | UseMutateFunction<QueryReturnValue<unknown, unknown>, Error, QueryArg, unknown>;
    isPending: boolean;
}
export type ToolkitHookFunction<QueryArg,ResultType>=UsedQueryHookFn<QueryArg,ResultType> | UsedMutationHookFn<QueryArg,ResultType>
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
}
export type BaseQueryFn<
  Args = any,
  Result = unknown,
  Error = unknown,
  DefinitionExtraOptions = Record<string, never>
> = (
  args: Args,
  //   api: BaseQueryApi,
  extraOptions: DefinitionExtraOptions
) => MaybePromise<QueryReturnValue<Result, Error>>;

type MaybePromise<T> = T | Promise<T> | (T extends any ? Promise<T> : never);
export type BaseQueryArg<T extends (arg: any, ...args: any[]) => any> =
  T extends (arg: infer A, ...args: any[]) => any ? A : any;
export type BaseQueryExtraOptions<BaseQuery extends BaseQueryFn> =
  Parameters<BaseQuery>[2];

declare const _NEVER: unique symbol;
export type NEVER = typeof _NEVER;

export interface QueryExtraOptions<
  TQueryKey extends QueryKey,
  //   ResultType,
  QueryArg
  //   BaseQuery extends BaseQueryFn,
  //   ReducerPath extends string = string
> {
  type: DefinitionType.query;
  /**
   * Used by `query` endpoints. Determines which 'tag' is attached to the cached data returned by the query.
   * Expects an array of tag type strings, an array of objects of tag types with ids, or a function that returns such an array.
   * 1.  `['Post']` - equivalent to `2`
   * 2.  `[{ type: 'Post' }]` - equivalent to `1`
   * 3.  `[{ type: 'Post', id: 1 }]`
   * 4.  `(result, error, arg) => ['Post']` - equivalent to `5`
   * 5.  `(result, error, arg) => [{ type: 'Post' }]` - equivalent to `4`
   * 6.  `(result, error, arg) => [{ type: 'Post', id: 1 }]`
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
   *   tagTypes: ['Posts'],
   *   endpoints: (build) => ({
   *     getPosts: build.query<PostsResponse, void>({
   *       query: () => 'posts',
   *       // highlight-start
   *       providesTags: (result) =>
   *         result
   *           ? [
   *               ...result.map(({ id }) => ({ type: 'Posts' as const, id })),
   *               { type: 'Posts', id: 'LIST' },
   *             ]
   *           : [{ type: 'Posts', id: 'LIST' }],
   *       // highlight-end
   *     })
   *   })
   * })
   * ```
   */
  providesTags?: (args: QueryArg) => TQueryKey;

  /**
   * Not to be used. A query should not invalidate tags in the cache.
   */
  invalidatesQuery?: never;
}
export interface MutationExtraOptions<
  TQueryKey extends QueryKey,
  //   ResultType,
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
  invalidatesTags?: (args: QueryArg) => TQueryKey;
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
  query<ResultType, QueryArg>(
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

export type Api<
  BaseQuery extends BaseQueryFn,
  //   ReducerPath extends string,
  TQueryKey extends QueryKey
  //   Enhancers extends ModuleName = CoreModule
> = {
  /**
   * A function to inject the endpoints into the original API, but also give you that same API with correct types for these endpoints back. Useful with code-splitting.
   */

  buildEndpoints<NewDefinitions extends EndpointDefinitions>(_: {
    endpoints: (build: EndpointBuilder<BaseQuery, TQueryKey>) => NewDefinitions;
    /**
     * Optionally allows endpoints to be overridden if defined by multiple `injectEndpoints` calls.
     *
     * If set to `true`, will override existing endpoints with the new definition.
     * If set to `'throw'`, will throw an error if an endpoint is redefined with a different definition.
     * If set to `false` (or unset), will not override existing endpoints with the new definition, and log a warning in development.
     */
    // overrideExisting?: boolean | "throw";
  }): EndpointDefinitions;
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
  //   TagTypes extends string = never
> {
  /**
   * The base query used by each endpoint if no `queryFn` option is specified. RTK Query exports a utility called [fetchBaseQuery](./fetchBaseQuery) as a lightweight wrapper around `fetch` for common use-cases. See [Customizing Queries](../../rtk-query/usage/customizing-queries) if `fetchBaseQuery` does not handle your requirements.
   *
   * @example
   *
   * ```ts
   * import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { QueryKeys } from './redux/query/core/apiState';
import { QueryKey } from '@tanstack/react-query';
import { UnwrapPromise } from './redux/query/tsHelpers';
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



export type UseMutation<D extends MutationDefinition<any, any, any, any>> = <
  R extends Record<string, any> = MutationResultSelectorResult<D>,
>(
  options?: UseMutationStateOptions<D, R>,
) => readonly [MutationTrigger<D>, UseMutationStateResult<D, R>]


export interface ApiModules<
// eslint-disable-next-line @typescript-eslint/no-unused-vars
BaseQuery extends BaseQueryFn,
Definitions extends EndpointDefinitions,
// eslint-disable-next-line @typescript-eslint/no-unused-vars
ReducerPath extends string,
// eslint-disable-next-line @typescript-eslint/no-unused-vars
TagTypes extends string,
> {
[reactHooksModuleName]: {
  /**
   *  Endpoints based on the input endpoints provided to `createApi`, containing `select`, `hooks` and `action matchers`.
   */
  endpoints: {
    [K in keyof Definitions]: Definitions[K] extends QueryDefinition<
      any,
      any,
      any,
      any
    >
      ? QueryHooks<Definitions[K]>
      : Definitions[K] extends MutationDefinition<any, any, any, any, any>
        ? MutationHooks<Definitions[K]>
        : never
  }

} & HooksWithUniqueNames<Definitions>
}


export type HooksWithUniqueNames<Definitions extends EndpointDefinitions> =
  QueryHookNames<Definitions> &
    MutationHookNames<Definitions>


type QueryHookNames<Definitions extends EndpointDefinitions> = {
        [K in keyof Definitions as Definitions[K] extends {
          type: DefinitionType.query
        }
          ? `use${Capitalize<K & string>}Query`
          : never]: UseQuery<
          Extract<Definitions[K], QueryDefinition<any, any, any, any>>
        >
      }
      


    
  
      
type MutationHookNames<Definitions extends EndpointDefinitions> = {
        [K in keyof Definitions as Definitions[K] extends {
          type: DefinitionType.mutation
        }
          ? `use${Capitalize<K & string>}Mutation`
          : never]: UseMutation<
          Extract<Definitions[K], MutationDefinition<any, any, any, any>>
        >
      }
      