import {
  UseQueryResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getPagesAmount } from "../../../components/Pagination";
import { getCustomersSubset_API } from "../../../services/apiCustomers";
import { CustomersListType } from "../customers";
import { useToast } from "@chakra-ui/react";

export function useCustomers() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const toast = useToast();
  const queryClient = useQueryClient();
  const {
    data: { customers, totalItems } = { customers: [], totalItems: 0 },
    isLoading,
    error,
  }: UseQueryResult<CustomersListType> = useQuery({
    queryKey: ["customers", page],
    queryFn: () => getCustomersSubset_API({ page }),
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
