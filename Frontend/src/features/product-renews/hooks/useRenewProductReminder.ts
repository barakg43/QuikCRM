import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { renewProductReminder_API } from "../../../services/apiProductRenew";
export function useRenewProductReminder() {
  const toast = useToast();
  const { t } = useTranslation("productRenews", { keyPrefix: "renew" });
  const queryClient = useQueryClient();
  const { mutate: renewProductReminder, isPending } = useMutation({
    mutationFn: renewProductReminder_API,
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
  return { renewProductReminder, isPending };
}
