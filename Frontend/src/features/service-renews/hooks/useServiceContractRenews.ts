import { useToast } from "@chakra-ui/react";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { usePageNumber } from "../../../hooks/usePageNumber";
import { usePeriodExpirationParams } from "../../../hooks/usePeriodExpirationParams";
import { getAllServiceRenewForPeriodTime_API } from "../../../services/apiServiceRenew";
import { SubsetListType } from "../../../services/globalTypes";
import { ServiceRenewRecord } from "../serviceRenews";

export function useServiceContractRenews() {
  const toast = useToast();
  const page = usePageNumber();
  const { t } = useTranslation("serviceRenews", { keyPrefix: "renew-table" });

  const { daysBeforeExpiration, monthsAfterExpiration } =
    usePeriodExpirationParams();
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
    queryKey: [
      "services-contracts",
      daysBeforeExpiration,
      monthsAfterExpiration,
      page,
    ],
    queryFn: () =>
      getAllServiceRenewForPeriodTime_API({
        daysBeforeExpiration,
        monthsAfterExpiration,
        page,
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
