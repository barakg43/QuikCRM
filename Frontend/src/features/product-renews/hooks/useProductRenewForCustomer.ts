import { useToast } from "@chakra-ui/react";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { usePageNumber } from "../../../hooks/usePageNumber";
import { getProductRemindersByCustomerId_API } from "../../../services/apiProductRenew";
import { SubsetListType } from "../../../services/globalTypes";
import { useCustomerIdParam } from "../../customer/hooks/useCustomerIdParam";

export function useProductRenewForCustomer() {
  const toast = useToast();
  const customerID = useCustomerIdParam();
  const { t } = useTranslation("productRenews", { keyPrefix: "renew-table" });
  const page = usePageNumber();
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
    queryKey: ["product-renews-for-customer", customerID, page],
    queryFn: () => getProductRemindersByCustomerId_API({ customerID, page }),
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
