import { Button, Flex, VStack } from "@chakra-ui/react";
import { LegacyRef } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PeriodSelector from "./PeriodSelector";
import ServiceFormRow from "./ServiceFormRow";
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

  return (
    <form onSubmit={handleSubmit(onRenew)}>
      <Flex grow={1} gap={6} fontSize='2xl'>
        <VStack>
          <ServiceFormRow
            label='contactDescription'
            register={register}
            error={errors?.contactDescription}
            type='textarea'
          />
          <ServiceFormRow
            label='contractPrice'
            register={register}
            error={errors?.contractPrice}
            defaultValue={contractPrice}
            type='number'
          />
        </VStack>
        <PeriodSelector
          defaultValue={defaultPeriodKind}
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
