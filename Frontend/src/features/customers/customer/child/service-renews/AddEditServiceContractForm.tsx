import { Button, Grid } from "@chakra-ui/react";
import { LegacyRef, useState } from "react";
import { useForm } from "react-hook-form";
import { DetailRow } from "../../../../../components/DetailRow";
import {
  calculateForwardDateByMonthsAndDays,
  getStringDate,
} from "../../../../../services/utils";
import PeriodSelector from "../../../../service-renews/PeriodSelector";
import ServiceFormRow from "../../../../service-renews/ServiceFormRow";
import { useAddServiceContract } from "../../../../service-renews/hooks/useAddServiceContract";
import { useUpdateServiceContract } from "../../../../service-renews/hooks/useUpdateServiceContract";
import {
  PeriodType,
  RenewServiceContractProps,
  ServiceRenewRecord,
} from "../../../../service-renews/serviceRenews";

function AddEditServiceContractForm({
  submitButtonRef,
  serviceRenewToEdit = {},
  onSubmit,
}: {
  submitButtonRef: LegacyRef<HTMLButtonElement> | undefined;
  serviceRenewToEdit?: RenewServiceContractProps | Record<string, never>;
  onSubmit?: () => void;
}) {
  const {
    contactDescription,
    contractID,
    contractPrice,
    periodKind,
    startDateOfContract,
  } = serviceRenewToEdit;
  const [period, setPeriod] = useState<PeriodType>(periodKind);
  const { addServiceContract } = useAddServiceContract();
  const { updateServiceContract } = useUpdateServiceContract();
  const { register, handleSubmit, formState, reset } =
    useForm<ServiceRenewRecord>();
  const { errors } = formState;
  const periodToMonths = {
    MONTHLY: 1,
    QUARTERLY: 3,
    YEARLY: 12,
  };
  function onSubmitForm(data: ServiceRenewRecord) {
    console.log("test", data, serviceRenewToEdit);
    if (serviceRenewToEdit) {
      // updateServiceContract({ ...data, contractID });
    } else {
      // addServiceContract(data);
    }
    onSubmit?.();
    reset();
  }
  const startDateDefaultValue = getStringDate(startDateOfContract);
  const finishDateDefaultValue = getStringDate(
    calculateForwardDateByMonthsAndDays({
      startDate: startDateOfContract,
      months: periodToMonths[period],
    })
  );

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Grid
        gridTemplateAreas={`"start finish"
                            "period period"
                            "price contact"
                            "child description"`}
      >
        <ServiceFormRow
          label='startDateOfContract'
          register={register}
          defaultValue={startDateDefaultValue}
          error={errors?.startDateOfContract}
          type='date'
          sx={{ gridArea: "start" }}
        />

        <PeriodSelector
          defaultValue={period}
          onChange={setPeriod}
          register={register("periodKind", { required: true })}
          sx={{ gridArea: "period" }}
        />
        <DetailRow
          label='finishDateOfContract'
          value={finishDateDefaultValue}
          sx={{ gridArea: "finish" }}
        />
        <ServiceFormRow
          label='contractPrice'
          register={register}
          error={errors?.contractPrice}
          defaultValue={contractPrice}
          type='number'
          sx={{ gridArea: "price" }}
        />
        <ServiceFormRow
          label='contactDescription'
          register={register}
          error={errors?.contactDescription}
          defaultValue={contactDescription}
          type='textarea'
          sx={{ gridArea: "description" }}
        />
      </Grid>
      <Button ref={submitButtonRef} display='none' type='submit' />
    </form>
  );
}

export default AddEditServiceContractForm;
