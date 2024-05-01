import { TFunction } from "i18next";
import { HTMLInputTypeAttribute } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormRow from "../../components/FormRow";
import { RenewContractProps } from "./serviceRenews";

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
function RenewFormRow({
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

export default RenewFormRow;
