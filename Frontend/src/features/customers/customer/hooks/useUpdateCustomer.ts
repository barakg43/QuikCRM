import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { updateCustomerDetails_API } from "../../../../services/apiCustomers";
export function useUpdateCustomer(customerId: number) {
  const toast = useToast();
  const { t } = useTranslation("customers", { keyPrefix: "update" });
  const queryClient = useQueryClient();
  const { mutate: updateCustomerDetails, isPending } = useMutation({
    mutationFn: updateCustomerDetails_API,
    onSuccess: () => {
      console.log("success");
      // queryClient.setQueryData(["user"], user);
      toast({
        description: t("toast-title"),
        title: t("toast-message-success"),
        status: "success",
      });
      queryClient.refetchQueries({
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
