import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { addNewProductReminder_API } from "../../../services/apiProductRenew";
export function useAddServiceContract() {
  const toast = useToast();
  const { t } = useTranslation("serviceRenews", { keyPrefix: "add" });
  const queryClient = useQueryClient();
  const { mutate: addServiceContract, isPending } = useMutation({
    mutationFn: addNewProductReminder_API,
    onSuccess: () =>
      toast({
        description: t("toast-title"),
        title: t("toast-message-success"),
        status: "success",
      }),
    onError: () => {
      toast({
        description: t("toast-title"),
        title: t("toast-message-error"),
        status: "error",
      });
      queryClient.invalidateQueries({
        queryKey: ["customer"],
      });
    },
  });
  return { addServiceContract, isPending };
}
