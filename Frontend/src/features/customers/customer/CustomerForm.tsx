import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { HTMLInputTypeAttribute, LegacyRef } from "react";
import { UseFormRegisterReturn, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import StyledSelect, { Option } from "../../../components/StyledSelect.tsx";
import { customerStatuses } from "../CustomersTable.tsx";
import { CustomerFullDataType } from "../customers";

function CustomerForm({
  submitRef,
  customerToEdit = {},
}: {
  submitRef: LegacyRef<HTMLButtonElement> | undefined;
  customerToEdit?: CustomerFullDataType | Record<string, never>;
}) {
  const { register, handleSubmit, reset, getValues, formState } =
    useForm<CustomerFullDataType>({
      // defaultValues: isEditSession ? editValues : {},
    });
  const { t } = useTranslation("customers", { keyPrefix: "details" });
  const { errors } = formState;
  const { customerId } = useParams();
  console.log("customerId", customerId);

  // const {
  //   customer: {
  //     customerName,
  //     customerShortName,
  //     customerStatus,
  //     customerIdentificationNumber,
  //     customerMainPhone,
  //     customerMainEMail,
  //     remarks,
  //     address,
  //     city,
  //     postalCode,
  //     addressRemarks,
  //     contactPersonName,
  //     contactPersonPhone,
  //     contactPersonPost,
  //     contactPersonMobilePhone,
  //   },
  //   isLoading,
  //   error,
  // } = useCustomer(Number(customerId));
  const {
    customerName,
    customerShortName,
    customerStatus,
    customerIdentificationNumber,
    customerMainPhone,
    customerMainEMail,
    remarks,
    address,
    city,
    postalCode,
    addressRemarks,
    contactPersonName,
    contactPersonPhone,
    contactPersonPost,
    contactPersonMobilePhone,
  } = customerToEdit;
  function onSubmit(data: CustomerFullDataType) {
    console.log(data);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HStack gap={"1rem"} justifyContent='space-around'>
        <VStack justifyItems='flex-start'>
          <FormRow
            label={t("customerName")}
            defaultValue={customerName}
            register={register("customerName")}
          />
          <FormRow
            label={t("customerShortName")}
            defaultValue={customerShortName}
            isRequired
            register={register("customerShortName")}
          />
          <FormRow
            label={t("customerIdentificationNumber")}
            defaultValue={customerIdentificationNumber}
            register={register("customerIdentificationNumber")}
          />
          <StatusSelect
            label={t("customerStatus")}
            value={customerStatus}
            register={register("customerStatus")}
          />
          <FormRow
            label={t("customerMainPhone")}
            defaultValue={customerMainPhone}
            isRequired
            register={register("customerMainPhone")}
          />
          <FormRow
            label={t("customerMainEMail")}
            defaultValue={customerMainEMail}
            register={register("customerMainPhone")}
          />
          <FormRow
            type='textarea'
            label={t("remarks")}
            defaultValue={remarks}
            register={register("remarks")}
          />
        </VStack>
        <VStack>
          <FormRow
            label={t("contactPersonName")}
            defaultValue={contactPersonName}
            register={register("contactPersonName")}
          />
          <FormRow
            label={t("contactPersonPost")}
            defaultValue={contactPersonPost}
            register={register("contactPersonPost")}
          />
          <FormRow
            label={t("contactPersonMobilePhone")}
            defaultValue={contactPersonMobilePhone}
            register={register("contactPersonMobilePhone")}
          />
          <FormRow
            label={t("contactPersonPhone")}
            defaultValue={contactPersonPhone}
            register={register("contactPersonPhone")}
          />
          <FormRow
            label={t("address")}
            defaultValue={address}
            register={register("address")}
          />
          <FormRow label={t("city")} defaultValue={city} />
          <FormRow label={t("postalCode")} defaultValue={postalCode} />
          <FormRow
            type='textarea'
            label={t("addressRemarks")}
            defaultValue={addressRemarks}
            register={register("addressRemarks")}
          />
        </VStack>
      </HStack>
      <Button ref={submitRef} display='none' type='submit' />
    </form>
  );
}
type FromRowProps = {
  label: string;
  type?: HTMLInputTypeAttribute | undefined;
  register?: UseFormRegisterReturn<string> | undefined;
  isRequired?: boolean;
  defaultValue?: string | number | readonly string[] | undefined;
};
function FormRow({
  label,
  defaultValue,
  type = "text",
  register,
  isRequired = false,
}: FromRowProps) {
  return (
    <FormControl isRequired={isRequired} display='flex' alignItems='center'>
      <FormLabel width='12rem'>{label}</FormLabel>
      {type === "textarea" ? (
        <Textarea
          placeholder={label}
          variant='flushed'
          defaultValue={defaultValue || ""}
          {...register}
        />
      ) : (
        <Input
          type={type}
          defaultValue={defaultValue || ""}
          placeholder={label}
          variant='flushed'
          {...register}
        />
      )}
    </FormControl>
  );
}

function StatusSelect({
  label,
  register,
  value,
}: {
  label: string;
  register?: UseFormRegisterReturn<string> | undefined;
  value?: string | number | readonly string[] | undefined;
}) {
  const { t } = useTranslation("customers", { keyPrefix: "status" });
  const StatusOptions: Option[] = customerStatuses.map((customerStatus) => {
    return {
      label: t(customerStatus),
      value: customerStatus,
    };
  });

  return (
    <FormControl isRequired display='flex' alignItems='center'>
      <FormLabel width='12rem'>{label}</FormLabel>
      <StyledSelect
        width='10rem'
        value={value}
        options={StatusOptions}
        register={register}
      ></StyledSelect>
    </FormControl>
  );
}
export default CustomerForm;
