import { useQuery } from "@tanstack/react-query";
import { getCustomerDataByID } from "../../../services/apiCustomers";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

export function useCustomer(customerId: number) {
  const {
    data: customer = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["customer", customerId],
    queryFn: () => getCustomerDataByID(customerId),
  });
  if (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.status);
      console.error(error.response);
    }
  }
  console.log("useCustomer");

  return { customer, isLoading, error };
}
