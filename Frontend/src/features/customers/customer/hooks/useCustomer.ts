import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCustomerDataByID_API } from "../../../../services/apiCustomers";
import { CustomerFullDataType } from "../../customers";

type useCustomerReturnType = {
  customer: CustomerFullDataType | Record<string, never>;
  isLoading: boolean;
  error: Error | null;
};
export function useCustomer(customerId: number): useCustomerReturnType {
  const {
    data: customer = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["customer", customerId],
    queryFn: () => getCustomerDataByID_API(customerId),
  });
  if (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.status);
      console.error(error.response);
    }
  }
  // console.log("useCustomer");

  return { customer, isLoading, error };
}
