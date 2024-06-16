import { Button, Grid } from "@chakra-ui/react";
import { LegacyRef } from "react";
import { useForm } from "react-hook-form";
import ExtendFormRow from "../../components/ExtendFormRow";
import { useRenewProductReminder } from "./hooks/useRenewProductReminder";

export type ProductRenewPanelProps = {
  systemDetailID: number;
  productDetailDescription: string;
  notes1: string | undefined;
  notes2: string | undefined;
  notes3: string | undefined;
  notes4: string | undefined;
  submitButtonRef: LegacyRef<HTMLButtonElement> | undefined;
  onSubmit?: () => void;
};
function ProductRenewPanel({
  systemDetailID,
  productDetailDescription,
  notes1,
  notes2,
  notes3,
  notes4,
  submitButtonRef,
  onSubmit,
}: ProductRenewPanelProps) {
  const { renewProductReminder } = useRenewProductReminder();
  // const {} = useRadioGroup();
  const { register, handleSubmit, formState, reset } =
    useForm<RenewProductRecord>();
  const { errors } = formState;
  function onRenew({
    productDetailDescription,
    notes1,
    notes2,
    notes3,
    notes4,
    validityTill,
    price,
  }: RenewProductRecord) {
    if (errors && Object.keys(errors).length > 0) return;
    renewProductReminder({
      systemDetailID,
      productDetailDescription,
      notes1,
      notes2,
      notes3,
      notes4,
      validityTill,
      price,
    });
    reset();
    onSubmit?.();
  }

  return (
    <form onSubmit={handleSubmit(onRenew)}>
      <Grid
        gridTemplateRows={`1fr 1fr 1fr`}
        gridTemplateColumns={`1fr 1fr`}
        gap={6}
        fontSize='2xl'
      >
        <ExtendFormRow
          label='productDetailDescription'
          register={register}
          translationNS='productRenews'
          error={errors?.productDetailDescription}
          type='textarea'
          defaultValue={productDetailDescription}
          isRequired
        />

        <ExtendFormRow
          label='validityTill'
          register={register}
          error={errors?.validityTill}
          type='date'
          isRequired
          translationNS='productRenews'
        />

        <ExtendFormRow
          label='notes1'
          register={register}
          defaultValue={notes1}
          translationNS='productRenews'
          error={errors?.notes1}
          type='textarea'
        />
        <ExtendFormRow
          label='notes2'
          register={register}
          defaultValue={notes2}
          translationNS='productRenews'
          error={errors?.notes2}
          type='textarea'
        />
        <ExtendFormRow
          label='notes3'
          register={register}
          defaultValue={notes3}
          translationNS='productRenews'
          error={errors?.notes3}
          type='textarea'
        />
        <ExtendFormRow
          label='notes4'
          register={register}
          defaultValue={notes4}
          translationNS='productRenews'
          error={errors?.notes4}
          type='textarea'
        />
        <Button
          ref={submitButtonRef}
          onClick={() => console.log("click submit")}
          display='none'
          type='submit'
        />
      </Grid>
    </form>
  );
}
export default ProductRenewPanel;
