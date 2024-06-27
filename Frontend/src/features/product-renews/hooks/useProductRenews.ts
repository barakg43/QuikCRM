import { useToast } from "@chakra-ui/react";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { usePageNumber } from "../../../hooks/usePageNumber";
import { getAllProductReminderForPeriodTime_API } from "../../../services/apiProductRenew";
import { SubsetListType } from "../../../services/globalTypes";

export function useProductRenews() {
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation("productRenews", { keyPrefix: "renew-table" });
  const page = usePageNumber();
  const daysBeforeExpiration =
    Number(searchParams.get("daysBeforeExpiration")) || 21;
  const {
    data: { listSubset: productRenews, totalAmountInDataBase: totalItems } = {
      listSubset: [],
      totalAmountInDataBase: 0,
    },
    isLoading,
    error,
  }: UseQueryResult<
    SubsetListType<ProductReminderRecord> | never | undefined
  > = useQuery({
    queryKey: ["product-renews", daysBeforeExpiration, page],
    queryFn: () =>
      getAllProductReminderForPeriodTime_API({
        daysBeforeExpiration,
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

  return { productRenews, totalItems, isLoading };
}
