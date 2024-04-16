import { HStack, Stack, StackDivider } from "@chakra-ui/react";
import { TFunction } from "i18next";
import { HTMLInputTypeAttribute, LegacyRef } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { DetailRow } from "../../components/DetailRow";
import FormRow from "../../components/FormRow";
import { RenewServicePanel } from "./RenewServicePanel";
import { RenewContractProps, ServiceRenewRecord } from "./serviceRenews";
function ServiceRenewForm({
  submitButtonRef,
  serviceRenew = {},
  onSubmit,
}: {
  submitButtonRef: LegacyRef<HTMLButtonElement> | undefined;
  serviceRenew?: ServiceRenewRecord | Record<string, never>;
  onSubmit?: () => void;
}) {
  const {
    contactDescription,
    contractID,
    contractPrice,
    finishDateOfContract,
    periodKind,
    startDateOfContract,
  } = serviceRenew;
  const { t } = useTranslation("serviceRenews", { keyPrefix: "renew-table" });

  return (
    <Stack divider={<StackDivider />} spacing='3'>
      <HStack divider={<StackDivider />}>
        <DetailRow
          label={t("startDateOfContract")}
          value={new Date(startDateOfContract).toLocaleDateString()}
        />
        <DetailRow
          label={t("finishDateOfContract")}
          value={new Date(finishDateOfContract).toLocaleDateString()}
        />

        <DetailRow label={t("periodKind")} value={t("period." + periodKind)} />
      </HStack>
      <HStack divider={<StackDivider />}>
        <DetailRow label={t("contractPrice")} value={contractPrice} />
        <DetailRow label={t("contactDescription")} value={contactDescription} />
      </HStack>
      <RenewServicePanel
        contractID={contractID}
        submitButtonRef={submitButtonRef}
        onSubmit={onSubmit}
        defaultPeriodKind={periodKind}
      />
    </Stack>
  );
}
type FormRowServiceRenewProps = {
  maxLength?: number | undefined;
  t?: TFunction<string, string>;
  register: UseFormRegister<RenewContractProps>;
  type?: HTMLInputTypeAttribute | undefined;
  isRequired?: boolean | undefined;
  defaultValue?: string | number | readonly string[] | undefined;
  error?: FieldError | undefined;
  label: "contractID" | "contractPrice" | "periodKind" | "contactDescription";
};
export function RenewRowForm({
  maxLength,
  label,
  error,
  defaultValue,
  isRequired,
  register,
  type,
}: FormRowServiceRenewProps) {
  const { t } = useTranslation("serviceRenews");
  return (
    <FormRow
      label={t(label)}
      defaultValue={defaultValue}
      error={error?.message}
      register={register(label, {
        required: isRequired ? t("form.required") : undefined,
        maxLength:
          maxLength != undefined
            ? {
                value: maxLength,
                message: t("form.too-big-text", { length: maxLength }),
              }
            : undefined,
      })}
      isRequired={isRequired}
      type={type}
    />
  );
}

export default ServiceRenewForm;
