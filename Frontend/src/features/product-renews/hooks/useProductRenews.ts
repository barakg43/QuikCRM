import { useToast } from "@chakra-ui/react";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import {
  ProductRenewRecord,
  getAllProductReminderForPeriodTime,
} from "../../../services/apiProductRenew";

export function useServiceContractRenews() {
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation("productRenews", { keyPrefix: "renew-table" });
  const daysBeforeExpiration =
    Number(searchParams.get("daysBeforeExpiration")) || 21;
  const {
    data: serviceContractRenews = [],
    isLoading,
    error,
  }: UseQueryResult<ProductRenewRecord | never[]> = useQuery({
    queryKey: ["product-renews", daysBeforeExpiration],
    queryFn: () =>
      getAllProductReminderForPeriodTime({
        daysBeforeExpiration,
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
