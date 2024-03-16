import { useToast } from "@chakra-ui/react";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAllServiceRenewForPeriodTime } from "../../../services/apiServiceRenew";
import { ServiceRenewRecord } from "../serviceRenews";
import { useTranslation } from "react-i18next";

export function useServiceContractRenews() {
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation("serviceRenews", { keyPrefix: "renew-table" });
  const daysBeforeExpiration =
    Number(searchParams.get("daysBeforeExpiration")) || 15;
  const monthsAfterExpiration =
    Number(searchParams.get("monthsAfterExpiration")) || 4;
  const {
    data: serviceContractRenews = [],
    isLoading,
    error,
  }: UseQueryResult<ServiceRenewRecord | never[]> = useQuery({
    queryKey: [
      "services-contracts",
      daysBeforeExpiration,
      monthsAfterExpiration,
    ],
    queryFn: () =>
      getAllServiceRenewForPeriodTime({
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
