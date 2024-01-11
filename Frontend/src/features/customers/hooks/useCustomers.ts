import {
  UseQueryResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getPagesAmount } from "../../../components/Pagination";
import { getAllCustomers } from "../../../services/apiCustomers";
import { CustomerDataType } from "../customers";

export function useCustomers() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const queryClient = useQueryClient();
  const {
    data: { customers, totalItems } = { customers: [], totalItems: 0 },
    isLoading,
    error,
  }: UseQueryResult<CustomerDataType> = useQuery({
    queryKey: ["customers", page],
    queryFn: () => getAllCustomers({ page }),
  });
  const pageCount = getPagesAmount(totalItems);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["customers", page + 1],
      queryFn: () => getAllCustomers({ page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["customers", page - 1],
      queryFn: () => getAllCustomers({ page: page - 1 }),
    });

  return { customers, totalItems, isLoading, error };
}
