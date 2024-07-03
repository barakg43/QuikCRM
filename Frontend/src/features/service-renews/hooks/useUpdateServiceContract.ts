import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { updateServiceRenewDetails_API } from "../../../services/redux/api/apiServiceRenew";
export function useUpdateServiceContract() {
  const toast = useToast();
  const { t } = useTranslation("serviceRenews", { keyPrefix: "update" });
  const queryClient = useQueryClient();
  const { mutate: updateServiceContract, isPending } = useMutation({
    mutationFn: updateServiceRenewDetails_API,
    onSuccess: () => {
      toast({
        description: t("toast-title"),
        title: t("toast-message-success"),
        status: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["services-contracts"],
      });
    },

    onError: () =>
      toast({
        description: t("toast-title"),
        title: t("toast-message-error"),
        status: "error",
      }),
  });
  return { updateServiceContract, isPending };
}
