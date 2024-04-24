import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { renewService_API } from "../../../services/apiServiceRenew";
import { useServiceRenewPeriodParams } from "./useServiceRenewPeriodParams";

export function useRenewServiceContract() {
  const toast = useToast();
  const { t } = useTranslation("serviceRenews", { keyPrefix: "renew" });
  const queryClient = useQueryClient();
  const { daysBeforeExpiration, monthsAfterExpiration } =
    useServiceRenewPeriodParams();
  const { mutate: renewServiceContract, isPending } = useMutation({
    mutationFn: renewService_API,
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
  return { renewServiceContract, isPending };
}
