import { Button, Grid } from "@chakra-ui/react";
import { LegacyRef } from "react";
import { useForm } from "react-hook-form";
import ExtendFormRow from "../../components/ExtendFormRow";

export type ProductRenewPanelProps = {
  systemDetailID?: number;
  productDetailDescription?: string;
  notes1?: string;
  notes2?: string;
  notes3?: string;
  notes4?: string;
  price?: number;
  validityTill?: Date;
  submitButtonRef: LegacyRef<HTMLButtonElement> | undefined;
  onSubmit?: (productData: RenewProductRecord) => void;
};
function ProductRenewPanel({
  systemDetailID,
  productDetailDescription,
  notes1,
  notes2,
  notes3,
  notes4,
  price,
  validityTill,
  submitButtonRef,
  onSubmit,
}: ProductRenewPanelProps) {
  // const {} = useRadioGroup();
  const { register, handleSubmit, formState, reset } =
    useForm<RenewProductRecord>();
  const { errors } = formState;
  function onRenew(data: RenewProductRecord) {
    if (errors && Object.keys(errors).length > 0) return;
    reset();
    onSubmit?.({ ...data, systemDetailID: systemDetailID || 0 });
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
          sx={{ gridColumn: "span 2" }}
        />

        <ExtendFormRow
          label='validityTill'
          register={register}
          error={errors?.validityTill}
          defaultValue={validityTill?.toLocaleDateString("en-CA")}
          type='date'
          isRequired
          translationNS='productRenews'
        />
        <ExtendFormRow
          label='price'
          register={register}
          error={errors?.price}
          defaultValue={price}
          type='number'
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
        <Button ref={submitButtonRef} display='none' type='submit' />
      </Grid>
    </form>
  );
}
export default ProductRenewPanel;
