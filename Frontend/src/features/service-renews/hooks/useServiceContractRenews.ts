import { useToast } from "@chakra-ui/react";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAllServiceRenewForPeriodTime_API } from "../../../services/apiServiceRenew";
import { ServiceRenewRecord } from "../serviceRenews";
import { useTranslation } from "react-i18next";
import { useServiceRenewPeriodParams } from "./useServiceRenewPeriodParams";

export function useServiceContractRenews() {
  const toast = useToast();
  const { t } = useTranslation("serviceRenews", { keyPrefix: "renew-table" });

  const { daysBeforeExpiration, monthsAfterExpiration } =
    useServiceRenewPeriodParams();
  const {
    data: serviceContractRenews = [],
    isLoading,
    error,
  }: UseQueryResult<ServiceRenewRecord[] | never[]> = useQuery({
    queryKey: [
      "services-contracts",
      daysBeforeExpiration,
      monthsAfterExpiration,
    ],
    queryFn: () =>
      getAllServiceRenewForPeriodTime_API({
        daysBeforeExpiration,
        monthsAfterExpiration,
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

  return { serviceContractRenews, isLoading };
}
