import { useQuery } from "@tanstack/react-query";
import { getAllCustomers } from "../../services/apiCustomers";

export function useCustomers() {
  const {
    data: customers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: getAllCustomers,
  });
  return { customers, isLoading, error };
}
