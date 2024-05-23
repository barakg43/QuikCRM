import { useToast } from "@chakra-ui/react";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { getAllProductReminderForPeriodTime_API } from "../../../services/apiProductRenew";

export function useProductRenews() {
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation("productRenews", { keyPrefix: "renew-table" });
  const daysBeforeExpiration =
    Number(searchParams.get("daysBeforeExpiration")) || 21;
  const {
    data: productRenews = [],
    isLoading,
    error,
  }: UseQueryResult<ProductRenew[] | never[]> = useQuery({
    queryKey: ["product-renews", daysBeforeExpiration],
    queryFn: () =>
      getAllProductReminderForPeriodTime_API({
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

  return { productRenews, isLoading };
}
