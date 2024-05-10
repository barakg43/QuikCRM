import { UseFormRegisterReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import CustomRadioGroup from "./CustomRadioGroup";
import { PeriodType } from "./serviceRenews";

type PeriodSelectorProps = {
  defaultValue: PeriodType;
  register: UseFormRegisterReturn<string> | undefined;
};
function PeriodSelector({ defaultValue, register }: PeriodSelectorProps) {
  const { t } = useTranslation("serviceRenews", { keyPrefix: "renew-table" });

  const options = [
    { value: "MONTHLY", label: t("period.MONTHLY") },
    { value: "QUARTERLY", label: t("period.QUARTERLY") },
    { value: "YEARLY", label: t("period.YEARLY") },
  ];
  return (
    <CustomRadioGroup
      options={options}
      defaultValue={defaultValue}
      buttonWidth={"8rem"}
      label={`${t("periodKind")} :`}
      register={register}
    />
  );
}

export default PeriodSelector;
