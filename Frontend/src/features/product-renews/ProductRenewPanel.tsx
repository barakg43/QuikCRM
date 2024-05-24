import { Button, Flex, VStack } from "@chakra-ui/react";
import { LegacyRef } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("productRenews", { keyPrefix: "renew-table" });
  const { renewProductReminder } = useRenewProductReminder();
  // const {} = useRadioGroup();
  const { register, handleSubmit, formState, reset } =
    useForm<RenewProductRecord>();
  const { errors } = formState;
  function onRenew({
    systemDetailID,
    productDetailDescription,
    notes1,
    notes2,
    notes3,
    notes4,
  }: RenewProductRecord) {
    if (errors && Object.keys(errors).length > 0) return;
    renewProductReminder({
      systemDetailID,
      productDetailDescription,
      notes1,
      notes2,
      notes3,
      notes4,
    });
    reset();
    onSubmit?.();
  }

  return (
    <form onSubmit={handleSubmit(onRenew)}>
      <Flex grow={1} gap={6} fontSize='2xl'>
        <VStack>
          <ProductFormRow
            label='productDetailDescription'
            register={register}
            error={errors?.productDetailDescription}
            type='textarea'
          />
          <ProductFormRow
            label='contractPrice'
            register={register}
            error={errors?.notes1}
            defaultValue={notes1}
            type='number'
          />
          <ProductFormRow
            label='validityDate'
            register={register}
            error={errors?.validityDate}
            defaultValue={notes1}
            type='date'
            isRequired
          />
        </VStack>

        <VStack>
          <ProductFormRow
            label='notes1'
            register={register}
            error={errors?.notes1}
            type='textarea'
          />
          <ProductFormRow
            label='contractPrice'
            register={register}
            error={errors?.notes1}
            defaultValue={notes1}
            type='number'
          />
          <ProductFormRow
            label='validityDate'
            register={register}
            error={errors?.validityDate}
            defaultValue={notes1}
            type='date'
            isRequired
          />
        </VStack>
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
export default ProductRenewPanel;
