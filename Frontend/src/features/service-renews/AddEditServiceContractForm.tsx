import { Button, HStack, VStack } from "@chakra-ui/react";
import { LegacyRef } from "react";
import { useForm } from "react-hook-form";
import PeriodSelector from "./PeriodSelector";
import ServiceFormRow from "./ServiceFormRow";
import { useAddServiceContract } from "./hooks/useAddServiceContract";
import { useUpdateServiceContract } from "./hooks/useUpdateServiceContract";
import { ServiceRenewRecord } from "./serviceRenews";

function AddEditServiceContractForm({
  submitButtonRef,
  serviceRenewToEdit = {},
  onSubmit,
}: {
  submitButtonRef: LegacyRef<HTMLButtonElement> | undefined;
  serviceRenewToEdit?: ServiceRenewRecord | Record<string, never>;
  onSubmit?: () => void;
}) {
  const {
    contactDescription,
    contractID,
    contractPrice,
    finishDateOfContract,
    periodKind,
    startDateOfContract,
  } = serviceRenewToEdit;
  const { addServiceContract } = useAddServiceContract();
  const { updateServiceContract } = useUpdateServiceContract();
  const { register, handleSubmit, formState, reset } =
    useForm<ServiceRenewRecord>();
  const { errors } = formState;
  function onSubmitForm(data: ServiceRenewRecord) {
    if (serviceRenewToEdit) {
      updateServiceContract({ ...data, contractID });
    } else {
      addServiceContract(data);
    }
    onSubmit?.();
    reset();
  }
  const startDateDefaultValue = startDateOfContract
    .toISOString()
    .substring(0, 10);
  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <HStack gap={"1rem"} justifyContent='space-around'>
        <VStack justifyItems='flex-start'>
          <ServiceFormRow
            label='startDateOfContract'
            register={register}
            defaultValue={startDateDefaultValue}
            error={errors?.startDateOfContract}
            type='date'
          />

          <ServiceFormRow
            label='contractPrice'
            register={register}
            error={errors?.contractPrice}
            defaultValue={contractPrice}
            type='number'
          />
          <ServiceFormRow
            label='contactDescription'
            register={register}
            error={errors?.contactDescription}
            defaultValue={contactDescription}
            type='textarea'
          />
          <PeriodSelector
            defaultValue={periodKind}
            register={register("periodKind", { required: true })}
          />
        </VStack>
        <VStack></VStack>
      </HStack>
      <Button ref={submitButtonRef} display='none' type='submit' />
    </form>
  );
}

export default AddEditServiceContractForm;
