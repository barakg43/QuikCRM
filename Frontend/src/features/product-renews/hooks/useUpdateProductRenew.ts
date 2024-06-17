import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { updateProductReminder_API } from "../../../services/apiProductRenew";
export function useAddServiceContract() {
  const toast = useToast();
  const { t } = useTranslation("productRenews", { keyPrefix: "update" });
  const queryClient = useQueryClient();
  const { mutate: updateProductReminder, isPending } = useMutation({
    mutationFn: updateProductReminder_API,
    onSuccess: () => {
      toast({
        description: t("toast-title"),
        title: t("toast-message-success"),
        status: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["product-renews"],
      });
    },

    onError: () =>
      toast({
        description: t("toast-title"),
        title: t("toast-message-error"),
        status: "error",
      }),
  });
  return { updateProductReminder, isPending };
}
