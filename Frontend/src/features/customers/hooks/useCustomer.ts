import { useQuery } from "@tanstack/react-query";
import { getCustomerDataByID } from "../../../services/apiCustomers";

export function useCustomer(customerId: number) {
  const {
    data: customer,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["customer", customerId],
    queryFn: () => getCustomerDataByID(customerId),
  });

  return { customer, isLoading, error };
}
