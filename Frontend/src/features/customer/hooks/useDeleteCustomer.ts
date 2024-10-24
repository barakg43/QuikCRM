import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { deleteCustomer_API } from "../../../services/redux/api/apiCustomers";
export function useDeleteCustomer() {
  const toast = useToast();
  const { t } = useTranslation("customers", { keyPrefix: "delete" });
  const queryClient = useQueryClient();
  const {
    mutate: deleteCustomer,
    isPending,
    data,
  } = useMutation({
    mutationFn: deleteCustomer_API,
    onSuccess: () => {
      toast({
        description: t("toast-title"),
        title: t("toast-message-success"),
        status: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
    onError: () =>
      toast({
        description: t("toast-title"),
        title: t("toast-message-error"),
        status: "error",
      }),
  });

  return { deleteCustomer, isPending };
}
