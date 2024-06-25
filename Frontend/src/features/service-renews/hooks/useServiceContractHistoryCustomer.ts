import { useToast } from "@chakra-ui/react";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { getAllServiceContractHistoryCustomer } from "../../../services/apiServiceRenew";
import { SubsetListType } from "../../../services/globalTypes";
import { ServiceRenewRecord } from "../serviceRenews";
export function useServiceContractHistoryCustomer(
  customerId: number,
  itemsPerPage: number
) {
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const { t } = useTranslation("serviceRenews", { keyPrefix: "renew-table" });
  const {
    data: {
      listSubset: serviceContractRenews,
      totalAmountInDataBase: totalItems,
    } = {
      listSubset: [],
      totalAmountInDataBase: 0,
    },
    isLoading,
    error,
  }: UseQueryResult<SubsetListType<ServiceRenewRecord> | undefined> = useQuery({
    queryKey: ["services-contracts-for-customer", page, customerId],
    queryFn: () =>
      getAllServiceContractHistoryCustomer({
        customerId,
        page,
        itemsPerPage,
      }),
  });
  if (error) {
    toast({
      title: t("error-message-fetch"),
      // description: t("error-message-fetch"),
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }

  return { serviceContractRenews, totalItems, isLoading };
}
