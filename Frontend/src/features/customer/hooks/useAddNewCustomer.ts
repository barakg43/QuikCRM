import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { addNewCustomer_API } from "../../../services/redux/api/apiCustomers";
export function useAddNewCustomer() {
  const toast = useToast();

  const { t } = useTranslation("customers", { keyPrefix: "add" });
  const queryClient = useQueryClient();
  const { mutate: addNewCustomer, isPending } = useMutation({
    mutationFn: addNewCustomer_API,
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

    onError: () => {
      toast({
        description: t("toast-title"),
        title: t("toast-message-error"),
        status: "error",
      });
    },
  });
  return { addNewCustomer, isPending };
}
