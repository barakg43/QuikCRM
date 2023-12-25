import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { getAllCustomers } from "../../services/apiCustomers";
import { CustomerStatus } from "./CustomersTable";

type CustomerType = {
  customerID: number;
  activeContractID: number;
  customerShortName: string;
  customerName: string;
  customerStatus: CustomerStatus;
  customerIdentificationNumber: string;
  customerMainPhone: string;
  customerMainFax: string;
  customerMainEMail: string;
  customerWebSite: string;
  remarks: string;
  address: string;
  city: string;
  postalCode: string;
  addressRemarks: string;
  contactPersonName: string;
  contactPersonPost: string;
  contactPersonPhone: string;
  contactPersonMobilePhone: string;
  contactPersonFax: string;
  contactPersonEMail: string;
};
export function useCustomers() {
  const {
    data: customers,
    isLoading,
    error,
  }: UseQueryResult<CustomerType[]> = useQuery({
    queryKey: ["customers"],
    queryFn: getAllCustomers,
  });
  return { customers, isLoading, error };
}
