import { AlertStatus, useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

type UseTranslateToast = {
  status?: AlertStatus;
  descriptionKey?: string;
  titleKey: string;
  keyPrefix: string;
  translationNS: string;
};
export function useTranslateToast({
  status,
  translationNS,
  keyPrefix,
  descriptionKey,
  titleKey,
}: UseTranslateToast) {
  const { t } = useTranslation(translationNS, { keyPrefix });
  const toast = useToast();
  toast({
    description: descriptionKey ? t(descriptionKey) : undefined,
    title: t(titleKey),
    status,
  });
}
