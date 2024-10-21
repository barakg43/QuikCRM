import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { useMemo } from "react";
import {
  Api,
  BaseQueryArg,
  BaseQueryFn,
  BuildMutationHook,
  CreateApi,
  CreateApiOptions,
  DefinitionType,
  EndpointDefinition,
  EndpointDefinitions,
  HooksWithUniqueNames,
  MutationHookName,
  QueryDefinition,
  QueryHookName,
  TransformedResponse,
  UseMutation,
  UseQuery,
} from "./reactQueryToolkitType";
import { safeAssign } from "./tsHelpers";
import { capitalize } from "./utils";

export const createApi = /* @__PURE__ */ createApiCallback();

export function createApiCallback(): CreateApi {
  //   options: CreateApiOptions<AxiosBaseQuery, EndpointDefinitions, QueryKey>
  return function baseCreateApi<
    BaseQuery extends BaseQueryFn,
    Definitions extends EndpointDefinitions
  >(options: CreateApiOptions<BaseQuery>) {
    const { baseQuery } = options;
    // const extractRehydrationInfo = weakMapMemoize((action: UnknownAction) =>
    //   options.extractRehydrationInfo?.(action, {
    //     reducerPath: (options.reducerPath ?? "api") as any,
    //   })
    // );

    // const optionsWithDefaults: CreateApiOptions<any, any, any, any> = {
    //   reducerPath: "api",
    //   keepUnusedDataFor: 60,
    //   refetchOnMountOrArgChange: false,
    //   refetchOnFocus: false,
    //   refetchOnReconnect: false,
    //   invalidationBehavior: "delayed",
    //   ...options,
    // //   extractRehydrationInfo,
    //   serializeQueryArgs(queryArgsApi) {
    //     let finalSerializeQueryArgs = defaultSerializeQueryArgs;
    //     if ("serializeQueryArgs" in queryArgsApi.endpointDefinition) {
    //       const endpointSQA =
    //         queryArgsApi.endpointDefinition.serializeQueryArgs!;
    //       finalSerializeQueryArgs = (queryArgsApi) => {
    //         const initialResult = endpointSQA(queryArgsApi);
    //         if (typeof initialResult === "string") {
    //           // If the user function returned a string, use it as-is
    //           return initialResult;
    //         } else {
    //           // Assume they returned an object (such as a subset of the original
    //           // query args) or a primitive, and serialize it ourselves
    //           return defaultSerializeQueryArgs({
    //             ...queryArgsApi,
    //             queryArgs: initialResult,
    //           });
    //         }
    //       };
    //     } else if (options.serializeQueryArgs) {
    //       finalSerializeQueryArgs = options.serializeQueryArgs;
    //     }

    //     return finalSerializeQueryArgs(queryArgsApi);
    //   },
    //   tagTypes: [...(options.tagTypes || [])],
    // };

    // const context: ApiContext<EndpointDefinitions> = {
    //   endpointDefinitions: {},
    //   batch(fn) {
    //     // placeholder "batch" method to be overridden by plugins, for example with React.unstable_batchedUpdate
    //     fn();
    //   },
    //   apiUid: nanoid(),
    //   extractRehydrationInfo,
    //   hasRehydrationInfo: weakMapMemoize(
    //     (action) => extractRehydrationInfo(action) != null
    //   ),
    // };

    const api = {
      injectEndpoints,
      endpoints: {} as Definitions,

      //   enhanceEndpoints({ addTagTypes, endpoints }) {
      // if (addTagTypes) {
      //   for (const eT of addTagTypes) {
      //     if (!optionsWithDefaults.tagTypes!.includes(eT as any)) {
      //       (optionsWithDefaults.tagTypes as any[]).push(eT);
      //     }
      //   }
      // }
      // if (endpoints) {
      //   for (const [endpointName, partialDefinition] of Object.entries(
      //     endpoints
      //   )) {
      //     if (typeof partialDefinition === "function") {
      //       partialDefinition(context.endpointDefinitions[endpointName]);
      //     } else {
      //       Object.assign(
      //         context.endpointDefinitions[endpointName] || {},
      //         partialDefinition
      //       );
      //     }
      //   }
      // }
      // return api;
    } as Api<BaseQueryFn, QueryKey, Definitions>;

    // const initializedModules = modules.map((m) =>
    //   m.init(api as any, optionsWithDefaults as any, context)
    // );
    // const anyApi = api as any as Api<
    //   BaseQueryFn,
    //   QueryKey,
    //   EndpointDefinitions
    // >;
    function injectEndpoints(
      inject: Parameters<typeof api.injectEndpoints>[0]
    ) {
      const evaluatedEndpoints = inject.endpoints({
        query: (x) => ({ ...x, type: DefinitionType.query } as any),
        mutation: (x) => ({ ...x, type: DefinitionType.mutation } as any),
      });
      const endpointsHook: HooksWithUniqueNames<EndpointDefinitions> = {};
      for (const [endpointName, definition] of Object.entries(
        evaluatedEndpoints
      )) {
        if (inject.overrideExisting !== true && endpointName in api.endpoints) {
          if (inject.overrideExisting === "throw") {
            throw new Error(
              `called \`injectEndpoints\` to override already-existing endpointName ${endpointName} without specifying \`overrideExisting: true\``
            );
          } else if (
            typeof process !== "undefined" &&
            process.env.NODE_ENV === "development"
          ) {
            console.error(
              `called \`injectEndpoints\` to override already-existing endpointName ${endpointName} without specifying \`overrideExisting: true\``
            );
          }

          continue;
        }
        (api.endpoints as any)[endpointName] = {};

        if (isQueryDefinition(definition) || isMutationDefinition(definition)) {
          safeAssign(api.endpoints[endpointName], definition);
          const { hookName, hookFn } = buildHook({
            endpointName,
            definition,
            baseQuery,
          });
          (endpointsHook as any)[hookName] = hookFn;
        }
      }
      console.log("endpointsHook", endpointsHook);
      return { ...api, ...endpointsHook };
    }
    return api;
  };

  //   return api;
  //     const api: Api<AxiosBaseQuery, QueryKey,EndpointDefinitions> = {
  //         endpointDefinitions:{},
  //         buildEndpoints,
  //       };

  //   function buildEndpoints(inject: Parameters<typeof api.buildEndpoints>[0]): {
  //     // console.log("before:", inject);
  //     const evaluatedEndpoints = inject.endpoints({
  //       query: (x) => ({ ...x, type: DefinitionType.query } as never),
  //       mutation: (x) => ({ ...x, type: DefinitionType.mutation } as never),
  //     });
  //     console.log("after:", evaluatedEndpoints);
  //     const apiHooks:EndpointDefinitions = {};
  //     const { baseQuery } = options;
  //     if (evaluatedEndpoints) {
  //       for (const [endpointName, definition] of Object.entries(
  //         evaluatedEndpoints
  //       )) {
  //         const { hookName, hookFn } = buildDefinition({
  //           endpointName,
  //           definition,
  //           baseQuery,
  //         });
  //         apiHooks[hookName] = hookFn as any;
  //       }
  //     }

  //     return apiHooks;
  //   }

  //   return api;
}

function buildHook<
  QueryArg,
  BaseQuery extends BaseQueryFn,
  ResultType,
  TQueryKey extends QueryKey
>({
  endpointName,
  definition,
  baseQuery,
}: {
  endpointName: string;
  definition: EndpointDefinition<QueryArg, BaseQuery, ResultType, TQueryKey>;
  baseQuery: BaseQuery;
}): {
  hookName: QueryHookName<string> | MutationHookName<string>;
  hookFn: UseQuery<QueryArg, ResultType> | UseMutation<QueryArg, ResultType>;
} {
  let hookFn = undefined;
  if (isQueryDefinition(definition)) {
    const hookName = `use${capitalize(
      endpointName
    )}Query` as QueryHookName<string>;
    hookFn = buildQueryHook(baseQuery, definition);
    return { hookName, hookFn };
  } else if (isMutationDefinition(definition)) {
    const hookName = `use${capitalize(
      endpointName
    )}Mutation` as MutationHookName<string>;
    hookFn = buildMutationHook<QueryArg, BaseQuery, ResultType, TQueryKey>({
      baseQuery,
      definition,
    });
    return { hookName, hookFn };
  } else {
    throw new Error("invalid endpoint definition");
  }
}
function defaultTransformResponse(baseQueryReturnValue: unknown) {
  return baseQueryReturnValue;
}
function buildQueryHook<
  QueryArg,
  BaseQuery extends BaseQueryFn,
  ResultType,
  TQueryKey extends QueryKey
>(
  baseQuery: BaseQuery,
  definition: QueryDefinition<QueryArg, BaseQuery, ResultType, TQueryKey>
): UseQuery<QueryArg, ResultType, string> {
  return function useQueryHook(queryArgs: QueryArg) {
    const queryClient = useQueryClient();

    const {
      query,
      transformResponse = defaultTransformResponse,
      autoCancellation,
      providesQueryKeys,
    } = definition;

    function prefetchQuery(args: QueryArg) {
      queryClient.prefetchQuery({
        queryKey: providesQueryKeys(args),

        queryFn: ({ signal }) =>
          fetchQueryData(
            autoCancellation,
            args,
            query,
            baseQuery,
            transformResponse,
            signal
          ),
      });
    }
    // const transformedResponse = definition.transformResponse;

    // <TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(
    // const {
    //   data: { customers, totalItems } = { customers: [], totalItems: 0 },
    //   isLoading,
    //   error,
    // }: UseQueryResult<CustomersListType> = useQuery({
    //   queryKey: ["customers", page, debouncedQuery],
    //   queryFn: ({ signal }) =>
    //     getCustomersSubset_API({ page, querySearch: debouncedQuery, signal }),
    // });
    // console.log(
    //   "query",
    //   queryArgs,
    //   query(queryArgs),
    //   providesQueryKeys(queryArgs)
    // );

    const { data, error, status }: UseQueryResult<ResultType> = useQuery({
      queryKey: providesQueryKeys(queryArgs),
      queryFn: ({ signal }) =>
        fetchQueryData(
          autoCancellation,
          queryArgs,
          query,
          baseQuery,
          transformResponse,
          signal
        ),
    });

    switch (status) {
      case "success":
        return {
          data,
          error: undefined,
          isLoading: false,
          isError: false,
          //   status: "success",
          prefetchQuery,
        };
        break;
      case "error":
        console.error("error useQueryHook:", error.message);
        return {
          data: undefined,
          isLoading: false,
          isError: true,
          error: error.message,
          //   status,
          prefetchQuery,
        };
      default:
        return {
          data: undefined,
          isLoading: true,
          isError: false,
          error: null,
          prefetchQuery,

          //   status,
        };
    }
  };
}

/**
 * Performs a query using the provided baseQuery and endpoint definition.
 * If autoCancellation is true, the query will be automatically cancelled
 * if the component is unmounted before the query completes or new request invoked before the previous one completes.
 * If transformResponse is provided, the response will be passed through it
 * before being returned.
 * @param autoCancellation
 * @param queryArgs
 * @param query
 * @param baseQuery
 * @param transformResponse
 * @param signal
 * @returns The result of the query, or undefined if the response is empty.
 */
async function fetchQueryData<
  QueryArg,
  BaseQuery extends BaseQueryFn,
  ResultType
>(
  autoCancellation: boolean | undefined,
  queryArgs: QueryArg,
  query: (arg: QueryArg) => BaseQueryArg<BaseQuery>,
  baseQuery: BaseQuery,
  transformResponse:
    | TransformedResponse<QueryArg, BaseQuery, ResultType>
    | ((baseQueryReturnValue: unknown) => unknown),

  signal: AbortSignal | undefined
) {
  const args = query(queryArgs);
  const rawData = await baseQuery(
    args,
    { signal: autoCancellation ? signal : undefined },
    {}
  );
  if (rawData && Object.entries(rawData).length > 0)
    return transformResponse(rawData as any, queryArgs);
  else return rawData;
}
export function buildMutationHook<
  QueryArg,
  BaseQuery extends BaseQueryFn,
  ResultType,
  TQueryKey extends QueryKey
>({
  baseQuery,
  definition,
}: BuildMutationHook<QueryArg, BaseQuery, ResultType, TQueryKey>): UseMutation<
  QueryArg,
  ResultType
> {
  //
  //   const triggerMutation = useCallback(
  //     function (arg: Parameters<typeof initiate>["0"]) {
  //       const promise = dispatch(initiate(arg, { fixedCacheKey }));
  //       setPromise(promise);
  //       return promise;
  //     },
  //     [dispatch, initiate, fixedCacheKey]
  //   );
  //   const finalState = useMemo(
  //     () => ({ ...currentState, originalArgs, reset }),
  //     [currentState, originalArgs, reset],
  //   )

  //   return useMemo(
  //     () => [triggerMutation, finalState] as const,
  //     [triggerMutation, finalState],
  //   )
  return function useMutationHook() {
    // const queryClient = useQueryClient();
    const {
      query,
      invalidatesKeys,
      transformResponse = defaultTransformResponse,
      onError,
      onSuccess,
    } = definition;
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation<
      unknown,
      Error,
      QueryArg,
      ResultType
    >({
      mutationFn: async (queryArgs: QueryArg) => {
        return fetchQueryData(
          false,
          queryArgs,
          query,
          baseQuery,
          transformResponse,
          undefined
        );
      },
      // onMutate: () => createInfinityToast("pending text", "loading"),
      onSuccess: (data, originalArgs) => {
        const typedData = data as ResultType;
        //   toast({
        //     description: t("toast-title"),
        //     title: t("toast-message-success"),
        //     status: "success",
        //   });
        onSuccess?.(originalArgs, typedData);

        if (invalidatesKeys)
          queryClient.invalidateQueries({
            queryKey: invalidatesKeys(originalArgs, typedData),
          });
      },

      onError: (error, args) => {
        onError?.(args, error);

        //   toast({
        //     description: t("toast-title"),
        //     title: t("toast-message-error"),
        //     status: "error",
        //   }),
      },
    });
    //   });
    //   async function deleteServiceContract(id: number) {
    //     toast.promise(new Promise(() => deleteServiceContract1(id)), {
    //       success: { title: "Promise resolved", description: "Looks great" },
    //       error: { title: "Promise rejected", description: "Something wrong" },
    //       loading: { title: "Promise pending", description: "Please wait" },
    //     });

    // return [mutate, isPending] as const;
    // let result = { isLoading: isPending, [endpointName]: mutate };
    // result[endpointName] = mutate;
    // return result;
    return useMemo(() => [mutate, isPending] as const, [mutate, isPending]);
  };
}

export function useUpdateCustomer(customerId: number) {
  const toast = useToast();
  const { t } = useTranslation("customers", { keyPrefix: "update" });
  const queryClient = useQueryClient();
  const { mutate: updateCustomerDetails, isPending } = useMutation({
    mutationFn: updateCustomerDetails_API,
    onSuccess: () => {
      // queryClient.setQueryData(["user"], user);
      toast({
        description: t("toast-title"),
        title: t("toast-message-success"),
        status: "success",
      });
      queryClient.refetchQueries({
        queryKey: ["customer", customerId],
      });
    },
    onError: () =>
      toast({
        description: t("toast-title"),
        title: t("toast-message-error"),
        status: "error",
      }),
  });
  return { updateCustomerDetails, isPending };
}

export const coreModule = ({
  createSelector = _createSelector,
}: CoreModuleOptions = {}): Module<CoreModule> => ({
  name: coreModuleName,
  init(
    api,
    {
      baseQuery,
      tagTypes,
      reducerPath,
      serializeQueryArgs,
      keepUnusedDataFor,
      refetchOnMountOrArgChange,
      refetchOnFocus,
      refetchOnReconnect,
      invalidationBehavior,
    },
    context
  ) {
    enablePatches();

    assertCast<InternalSerializeQueryArgs>(serializeQueryArgs);

    const assertTagType: AssertTagTypes = (tag) => {
      if (
        typeof process !== "undefined" &&
        process.env.NODE_ENV === "development"
      ) {
        if (!tagTypes.includes(tag.type as any)) {
          console.error(
            `Tag type '${tag.type}' was used, but not specified in \`tagTypes\`!`
          );
        }
      }
      return tag;
    };

    Object.assign(api, {
      reducerPath,
      endpoints: {},
      internalActions: {
        onOnline,
        onOffline,
        onFocus,
        onFocusLost,
      },
      util: {},
    });

    const {
      queryThunk,
      mutationThunk,
      patchQueryData,
      updateQueryData,
      upsertQueryData,
      prefetch,
      buildMatchThunkActions,
    } = buildThunks({
      baseQuery,
      reducerPath,
      context,
      api,
      serializeQueryArgs,
      assertTagType,
    });

    const { reducer, actions: sliceActions } = buildSlice({
      context,
      queryThunk,
      mutationThunk,
      reducerPath,
      assertTagType,
      config: {
        refetchOnFocus,
        refetchOnReconnect,
        refetchOnMountOrArgChange,
        keepUnusedDataFor,
        reducerPath,
        invalidationBehavior,
      },
    });

    safeAssign(api.util, {
      patchQueryData,
      updateQueryData,
      upsertQueryData,
      prefetch,
      resetApiState: sliceActions.resetApiState,
    });
    safeAssign(api.internalActions, sliceActions);

    const { middleware, actions: middlewareActions } = buildMiddleware({
      reducerPath,
      context,
      queryThunk,
      mutationThunk,
      api,
      assertTagType,
    });
    safeAssign(api.util, middlewareActions);

    safeAssign(api, { reducer: reducer as any, middleware });

    const {
      buildQuerySelector,
      buildMutationSelector,
      selectInvalidatedBy,
      selectCachedArgsForQuery,
    } = buildSelectors({
      serializeQueryArgs: serializeQueryArgs as any,
      reducerPath,
      createSelector,
    });

    safeAssign(api.util, { selectInvalidatedBy, selectCachedArgsForQuery });

    const {
      buildInitiateQuery,
      buildInitiateMutation,
      getRunningMutationThunk,
      getRunningMutationsThunk,
      getRunningQueriesThunk,
      getRunningQueryThunk,
    } = buildInitiate({
      queryThunk,
      mutationThunk,
      api,
      serializeQueryArgs: serializeQueryArgs as any,
      context,
    });

    safeAssign(api.util, {
      getRunningMutationThunk,
      getRunningMutationsThunk,
      getRunningQueryThunk,
      getRunningQueriesThunk,
    });

    return {
      name: coreModuleName,
      injectEndpoint(endpointName, definition) {
        const anyApi = api as any as Api<
          any,
          Record<string, any>,
          string,
          string
          //   CoreModule
        >;
        anyApi.endpoints[endpointName] ??= {} as any;
        if (isQueryDefinition(definition)) {
          safeAssign(
            anyApi.endpoints[endpointName],
            {
              name: endpointName,
              select: buildQuerySelector(endpointName, definition),
              initiate: buildInitiateQuery(endpointName, definition),
            },
            buildMatchThunkActions(queryThunk, endpointName)
          );
        } else if (isMutationDefinition(definition)) {
          safeAssign(
            anyApi.endpoints[endpointName],
            {
              name: endpointName,
              select: buildMutationSelector(),
              initiate: buildInitiateMutation(endpointName),
            },
            buildMatchThunkActions(mutationThunk, endpointName)
          );
        }
      },
    };
  },
});

// export function buildCreateApi<Modules extends [Module<any>, ...Module<any>[]]>(
//   ...modules: Modules
// ): CreateApi<Modules[number]["name"]> {
//   return function baseCreateApi(options) {
//     const extractRehydrationInfo = weakMapMemoize((action: UnknownAction) =>
//       options.extractRehydrationInfo?.(action, {
//         reducerPath: (options.reducerPath ?? "api") as any,
//       })
//     );

//     const optionsWithDefaults: CreateApiOptions<any, any, any, any> = {
//       reducerPath: "api",
//       keepUnusedDataFor: 60,
//       refetchOnMountOrArgChange: false,
//       refetchOnFocus: false,
//       refetchOnReconnect: false,
//       invalidationBehavior: "delayed",
//       ...options,
//       extractRehydrationInfo,
//       serializeQueryArgs(queryArgsApi) {
//         let finalSerializeQueryArgs = defaultSerializeQueryArgs;
//         if ("serializeQueryArgs" in queryArgsApi.endpointDefinition) {
//           const endpointSQA =
//             queryArgsApi.endpointDefinition.serializeQueryArgs!;
//           finalSerializeQueryArgs = (queryArgsApi) => {
//             const initialResult = endpointSQA(queryArgsApi);
//             if (typeof initialResult === "string") {
//               // If the user function returned a string, use it as-is
//               return initialResult;
//             } else {
//               // Assume they returned an object (such as a subset of the original
//               // query args) or a primitive, and serialize it ourselves
//               return defaultSerializeQueryArgs({
//                 ...queryArgsApi,
//                 queryArgs: initialResult,
//               });
//             }
//           };
//         } else if (options.serializeQueryArgs) {
//           finalSerializeQueryArgs = options.serializeQueryArgs;
//         }

//         return finalSerializeQueryArgs(queryArgsApi);
//       },
//       tagTypes: [...(options.tagTypes || [])],
//     };

//     const context: ApiContext<EndpointDefinitions> = {
//       endpointDefinitions: {},
//       batch(fn) {
//         // placeholder "batch" method to be overridden by plugins, for example with React.unstable_batchedUpdate
//         fn();
//       },
//       apiUid: nanoid(),
//       extractRehydrationInfo,
//       hasRehydrationInfo: weakMapMemoize(
//         (action) => extractRehydrationInfo(action) != null
//       ),
//     };

//     const api = {
//       injectEndpoints,
//       enhanceEndpoints({ addTagTypes, endpoints }) {
//         if (addTagTypes) {
//           for (const eT of addTagTypes) {
//             if (!optionsWithDefaults.tagTypes!.includes(eT as any)) {
//               (optionsWithDefaults.tagTypes as any[]).push(eT);
//             }
//           }
//         }
//         if (endpoints) {
//           for (const [endpointName, partialDefinition] of Object.entries(
//             endpoints
//           )) {
//             if (typeof partialDefinition === "function") {
//               partialDefinition(context.endpointDefinitions[endpointName]);
//             } else {
//               Object.assign(
//                 context.endpointDefinitions[endpointName] || {},
//                 partialDefinition
//               );
//             }
//           }
//         }
//         return api;
//       },
//     } as Api<BaseQueryFn, {}, string, string, Modules[number]["name"]>;

//     const initializedModules = modules.map((m) =>
//       m.init(api as any, optionsWithDefaults as any, context)
//     );

//     function injectEndpoints(
//       inject: Parameters<typeof api.injectEndpoints>[0]
//     ) {
//       const evaluatedEndpoints = inject.endpoints({
//         query: (x) => ({ ...x, type: DefinitionType.query } as any),
//         mutation: (x) => ({ ...x, type: DefinitionType.mutation } as any),
//       });

//       for (const [endpointName, definition] of Object.entries(
//         evaluatedEndpoints
//       )) {
//         if (
//           inject.overrideExisting !== true &&
//           endpointName in context.endpointDefinitions
//         ) {
//           if (inject.overrideExisting === "throw") {
//             throw new Error(
//               `called \`injectEndpoints\` to override already-existing endpointName ${endpointName} without specifying \`overrideExisting: true\``
//             );
//           } else if (
//             typeof process !== "undefined" &&
//             process.env.NODE_ENV === "development"
//           ) {
//             console.error(
//               `called \`injectEndpoints\` to override already-existing endpointName ${endpointName} without specifying \`overrideExisting: true\``
//             );
//           }

//           continue;
//         }

//         context.endpointDefinitions[endpointName] = definition;
//         for (const m of initializedModules) {
//           m.injectEndpoint(endpointName, definition);
//         }
//       }

//       return api as any;
//     }

//     return api.injectEndpoints({ endpoints: options.endpoints as any });
//   };
// }

// api[`use${capitalize(endpointName)}Query`] = useQuery;

function isQueryDefinition<
  QueryArg,
  BaseQuery extends BaseQueryFn,
  ResultType,
  TQueryKey extends QueryKey
>(e: EndpointDefinition<QueryArg, BaseQuery, ResultType, TQueryKey>) {
  return e.type === "query" /* query */;
}
function isMutationDefinition<
  QueryArg,
  BaseQuery extends BaseQueryFn,
  ResultType,
  TQueryKey extends QueryKey
>(e: EndpointDefinition<QueryArg, BaseQuery, ResultType, TQueryKey>) {
  return e.type === "mutation" /* mutation */;
}
