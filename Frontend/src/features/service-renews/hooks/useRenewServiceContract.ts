import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { usePeriodExpirationParams } from "../../../hooks/usePeriodExpirationParams";
import { renewService_API } from "../../../services/redux/api/apiServiceRenew";

export function useRenewServiceContract() {
  const toast = useToast();
  const { t } = useTranslation("serviceRenews", { keyPrefix: "renew" });
  const queryClient = useQueryClient();
  const { daysBeforeExpiration, monthsAfterExpiration } =
    usePeriodExpirationParams();
  const { mutate: renewServiceContract, isPending } = useMutation({
    mutationFn: renewService_API,
    onSuccess: () => {
      toast({
        description: t("toast-title"),
        title: t("toast-message-success"),
        status: "success",
      });
      queryClient.invalidateQueries({
        queryKey: [
          "services-contracts",
          daysBeforeExpiration,
          monthsAfterExpiration,
        ],
      });
    },
    onError: () =>
      toast({
        description: t("toast-title"),
        title: t("toast-message-error"),
        status: "error",
      }),
  });
  return { renewServiceContract, isPending };
}
