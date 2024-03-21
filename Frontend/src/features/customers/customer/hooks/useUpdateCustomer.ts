import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { updateCustomerDetails_API } from "../../../../services/apiCustomers";
import { useSearchParams } from "react-router-dom";
export function useUpdateCustomer() {
  const toast = useToast();
  const { t } = useTranslation("customers", { keyPrefix: "update" });
  const [searchParams] = useSearchParams();
  const customerId = Number(searchParams.get("customerId"));
  const queryClient = useQueryClient();
  const { mutate: updateCustomerDetails, isPending } = useMutation({
    mutationFn: updateCustomerDetails_API,
    onSuccess: () => {
      toast({
        description: t("toast-title"),
        title: t("toast-message-success"),
        status: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["customer", customerId],
      });
    },
    onError: () =>
      toast({
        description: t("toast-title"),
        title: t("toast-message-error"),
        status: "error",
      }),
  });
  return { updateCustomerDetails, isPending };
}
