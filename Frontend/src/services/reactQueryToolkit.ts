import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Api,
  BaseQueryFn,
  CreateApiOptions,
  DefinitionType,
  EndpointDefinition,
  EndpointDefinitions,
} from "./reactQueryToolkitType";
// import { isQueryDefinition } from "./reactQueryToolkit_copy.d copy";
import axios from "axios";
import { AxiosBaseQuery } from "./redux/baseApi";
import { capitalize } from "./utils";

export function createApi(options: CreateApiOptions<AxiosBaseQuery>) {
  const api: Api<AxiosBaseQuery, QueryKey> = {
    buildEndpoints,
  };

  function buildEndpoints(
    inject: Parameters<typeof api.buildEndpoints>[0]
  ): EndpointDefinitions {
    console.log("before:", inject);
    const evaluatedEndpoints = inject.endpoints({
      query: (x) => ({ ...x, type: DefinitionType.query } as never),
      mutation: (x) => ({ ...x, type: DefinitionType.mutation } as never),
    });
    console.log("after:", evaluatedEndpoints);
    const apiHooks: EndpointDefinitions = {};
    const { baseQuery } = options;
    if (evaluatedEndpoints) {
      for (const [endpointName, definition] of Object.entries(
        evaluatedEndpoints
      )) {
        const { hookName, hookFn } = buildDefinition({
          endpointName,
          definition,
          baseQuery,
        });
        apiHooks[hookName] = hookFn;
      }
    }

    return apiHooks;
  }

  return api;
}

function buildDefinition<
  QueryArg,
  BaseQuery extends BaseQueryFn,
  ResultType,
  TQueryKey extends QueryKey
>({
  endpointName,
  baseQuery,
  definition,
}: {
  endpointName: string;
  definition: EndpointDefinition<QueryArg, BaseQuery, ResultType, TQueryKey>;
  baseQuery: BaseQuery;
}): EndpointDefinition<QueryArg, BaseQueryFn, QueryKey> {
  let hookName = "";
  let hookFn = undefined;
  if (isQueryDefinition(definition)) {
    hookName = `use${capitalize(endpointName)}Query`;
    hookFn = buildQueryHook(baseQuery, definition);
  } else if (isMutationDefinition(definition)) {
    hookName = `use${capitalize(endpointName)}Mutation`;
    hookFn = buildMutationHook(endpointName, baseQuery, definition);
  }

  return { hookName, hookFn };
}
function buildQueryHook<
  QueryArg,
  BaseQuery extends BaseQueryFn,
  ResultType,
  TQueryKey extends QueryKey
>(
  baseQuery: BaseQuery,
  definition: EndpointDefinition<QueryArg, BaseQuery, ResultType, TQueryKey>
) {
  return function useQuery(queryArgs: QueryArg) {
    const { query, providesTags, transformResponse } = definition;
    const args = query(queryArgs);
    const { data, isLoading, error } = useQuery({
      queryKey: providesTags?.(args) as TQueryKey,
      queryFn: () => baseQuery(args, {}),
    });
    if (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response);
        throw error.message;
      }
    }
  };
}
function buildMutationHook<
  QueryArg,
  BaseQuery extends BaseQueryFn,
  ResultType,
  TQueryKey extends QueryKey
>(
  endpointName: string,
  baseQuery: BaseQuery,
  definition: EndpointDefinition<QueryArg, BaseQuery, ResultType, TQueryKey>
) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (queryArgs: QueryArg) => {
      return baseQuery(queryArgs, {});
    },
    // onMutate: () => createInfinityToast("pending text", "loading"),
    onSuccess: () => {
      toast({
        description: t("toast-title"),
        title: t("toast-message-success"),
        status: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["product-renews"],
      });
    },
    onError: () =>
      toast({
        description: t("toast-title"),
        title: t("toast-message-error"),
        status: "error",
      }),
  });
  //   async function deleteServiceContract(id: number) {
  //     toast.promise(new Promise(() => deleteServiceContract1(id)), {
  //       success: { title: "Promise resolved", description: "Looks great" },
  //       error: { title: "Promise rejected", description: "Something wrong" },
  //       loading: { title: "Promise pending", description: "Please wait" },
  //     });
  //   }
  return { deleteProductReminder, isPending };
}

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
