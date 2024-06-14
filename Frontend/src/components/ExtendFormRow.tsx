import { SystemStyleObject } from "@chakra-ui/react";
import { TFunction } from "i18next";
import { HTMLInputTypeAttribute } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormRow from "./FormRow";

type ExtendFormRowProps<T extends FieldValues> = {
  maxLength?: number | undefined;
  t?: TFunction<string, string>;
  register: UseFormRegister<T>;
  type?: HTMLInputTypeAttribute | undefined;
  isRequired?: boolean | undefined;
  defaultValue?: string | number | readonly string[] | undefined;
  error?: FieldError | undefined;
  translationNS: string;
  keyPrefix?: string | undefined;
  label: Path<T>;
  sx?: SystemStyleObject | undefined;
};
function ExtendFormRow<T extends FieldValues>({
  maxLength,
  label,
  error,
  translationNS,
  keyPrefix,
  defaultValue,
  isRequired,
  register,
  type,
  sx,
}: ExtendFormRowProps<T>) {
  const { t } = useTranslation(translationNS, { keyPrefix });
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
      sx={sx}
    />
  );
}

export default ExtendFormRow;
