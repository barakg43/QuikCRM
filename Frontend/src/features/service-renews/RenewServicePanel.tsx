import { Button, Flex, VStack } from "@chakra-ui/react";
import { LegacyRef } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import CustomRadioGroup from "./CustomRadioGroup";
import RenewFormRow from "./RenewFormRow";
import { useRenewServiceContract } from "./hooks/useRenewServiceContract";
import { PeriodType, RenewContractProps } from "./serviceRenews";
export type RenewPanelProps = {
  contractID: number;
  defaultPeriodKind: PeriodType;
  submitButtonRef: LegacyRef<HTMLButtonElement> | undefined;
  contractPrice: number;
  onSubmit?: () => void;
};
function RenewServicePanel({
  contractID,
  contractPrice,
  defaultPeriodKind,
  submitButtonRef,
  onSubmit,
}: RenewPanelProps) {
  const { t } = useTranslation("serviceRenews", { keyPrefix: "renew-table" });
  const { renewServiceContract } = useRenewServiceContract();
  // const {} = useRadioGroup();
  const { register, handleSubmit, formState, reset } =
    useForm<RenewContractProps>();
  const { errors } = formState;
  function onRenew({
    contractPrice,
    periodKind,
    contactDescription,
  }: RenewContractProps) {
    console.log(
      "test",
      contractID,
      contractPrice,
      periodKind,
      contactDescription
    );

    if (errors && Object.keys(errors).length > 0) return;
    renewServiceContract({
      contractID,
      contractPrice,
      periodKind,
      contactDescription,
    });
    reset();
    onSubmit?.();
  }
  const options = [
    { value: "MONTHLY", label: t("period.MONTHLY") },
    { value: "QUARTERLY", label: t("period.QUARTERLY") },
    { value: "YEARLY", label: t("period.YEARLY") },
  ];
  return (
    <form onSubmit={handleSubmit(onRenew)}>
      <Flex grow={1} gap={6} fontSize='2xl'>
        <VStack>
          <RenewFormRow
            label='contactDescription'
            register={register}
            error={errors?.contactDescription}
            type='textarea'
          />
          <RenewFormRow
            label='contractPrice'
            register={register}
            error={errors?.contractPrice}
            defaultValue={contractPrice}
            type='number'
          />
        </VStack>
        <CustomRadioGroup
          options={options}
          defaultValue={defaultPeriodKind}
          buttonWidth={"8rem"}
          label={`${t("periodKind")} :`}
          register={register("periodKind")}
        />
        <Button
          ref={submitButtonRef}
          onClick={() => console.log("click submit")}
          display='none'
          type='submit'
        />
      </Flex>
    </form>
  );
}
export default RenewServicePanel;
