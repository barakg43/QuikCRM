import { useToast } from "@chakra-ui/react";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { getProductRemindersByCustomerId_API } from "../../../services/apiProductRenew";

export function useProductRenewForCustomer() {
  const toast = useToast();
  const customerId = Number(useParams()["customerId"]);
  const { t } = useTranslation("productRenews", { keyPrefix: "renew-table" });
  const {
    data: productRenews = [],
    isLoading,
    error,
  }: UseQueryResult<ProductReminderRecord[] | never[]> = useQuery({
    queryKey: ["product-renews-for-customer", customerId],
    queryFn: () => getProductRemindersByCustomerId_API(customerId),
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
