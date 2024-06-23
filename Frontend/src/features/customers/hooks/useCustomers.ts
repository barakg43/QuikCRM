import { useToast } from "@chakra-ui/react";
import {
  UseQueryResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../../../hooks/useDebounce";
import { getCustomersSubset_API } from "../../../services/apiCustomers";
import { getPagesAmount } from "../../../services/utils";
import { CustomersListType } from "../customers";

export function useCustomers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const toast = useToast();
  const querySearch = searchParams.get("query") || undefined;

  const debouncedQuery = useDebounce(querySearch, 300);
  useEffect(() => {
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  }, [debouncedQuery]);
  const queryClient = useQueryClient();
  const {
    data: { customers, totalItems } = { customers: [], totalItems: 0 },
    isLoading,
    error,
  }: UseQueryResult<CustomersListType> = useQuery({
    queryKey: ["customers", page, debouncedQuery],
    queryFn: ({ signal }) =>
      getCustomersSubset_API({ page, querySearch: debouncedQuery, signal }),
  });
  if (error) {
    toast({
      title: "Error occurred",
      description: "there are error when fetching customer data",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
  const pageCount = getPagesAmount(totalItems);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["customers", page + 1],
      queryFn: () => getCustomersSubset_API({ page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["customers", page - 1],
      queryFn: () => getCustomersSubset_API({ page: page - 1 }),
    });
  return { customers, totalItems, isLoading, error };
}
