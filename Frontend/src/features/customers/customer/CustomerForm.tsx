import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { LegacyRef } from "react";
import { UseFormRegisterReturn, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import FormRow from "../../../components/FormRow.tsx";
import StyledSelect, { Option } from "../../../components/StyledSelect.tsx";
import { CustomerFullDataType } from "../customers";
import { useAddNewCustomer } from "./hooks/useAddNewCustomer.ts";
import { useUpdateCustomer } from "./hooks/useUpdateCustomer";
import { customerStatuses } from "../CustomersTable.tsx";

function CustomerForm({
  submitRef,
  customerToEdit = {},
  OnSubmit,
}: {
  submitRef: LegacyRef<HTMLButtonElement> | undefined;
  customerToEdit?: CustomerFullDataType | Record<string, never>;
  OnSubmit?: () => void;
}) {
  const { register, handleSubmit, formState, reset } =
    useForm<CustomerFullDataType>({
      // defaultValues: isEditSession ? editValues : {},
    }); // reset, getValues
  const { t } = useTranslation("customers", { keyPrefix: "details" });
  const { errors } = formState;
  const { customerId } = useParams();
  const { isPending: isUpdating, updateCustomerDetails } = useUpdateCustomer();
  const { isPending: isAdding, addNewCustomer } = useAddNewCustomer();
  const isSubmiting = isAdding || isUpdating;
  console.log("customerId", customerId);
  console.log(errors);
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

    if (customerId) {
      updateCustomerDetails({ ...data, customerID: Number(customerId) });
    } else {
      addNewCustomer(data);
    }
    reset();
    OnSubmit?.();
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
            register={register("customerMainEMail")}
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
          <FormRow
            label={t("city")}
            defaultValue={city}
            register={register("city")}
          />
          <FormRow
            label={t("postalCode")}
            defaultValue={postalCode}
            register={register("postalCode")}
          />
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
