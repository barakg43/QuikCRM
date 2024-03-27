import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { TFunction } from "i18next";
import {
  Dispatch,
  HTMLInputTypeAttribute,
  LegacyRef,
  SetStateAction,
  useEffect,
} from "react";
import {
  FieldError,
  UseFormRegister,
  UseFormRegisterReturn,
  useForm,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import FormRow from "../../../components/FormRow.tsx";
import StyledSelect, { Option } from "../../../components/StyledSelect.tsx";
import { customerStatuses } from "../CustomersTable.tsx";
import { CustomerFullDataType } from "../customers";
import { useAddNewCustomer } from "./hooks/useAddNewCustomer.ts";
import { useUpdateCustomer } from "./hooks/useUpdateCustomer";

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
  // const { t } = useTranslation("customers", { keyPrefix: "details" });
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
    if (errors) return;
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
          <FormRowCustomer
            register={register}
            label='customerName'
            defaultValue={customerName}
            maxLength={100}
            error={errors?.customerName}
          />
          <FormRowCustomer
            register={register}
            label='customerShortName'
            defaultValue={customerShortName}
            isRequired
            maxLength={50}
            error={errors?.customerShortName}
          />

          <FormRowCustomer
            register={register}
            label='customerIdentificationNumber'
            defaultValue={customerIdentificationNumber}
            maxLength={9}
            error={errors?.customerIdentificationNumber}
          />

          <StatusSelect
            value={customerStatus}
            register={register("customerStatus")}
          />
          <FormRowCustomer
            register={register}
            label='customerMainPhone'
            defaultValue={customerMainPhone}
            isRequired
            maxLength={10}
            error={errors?.customerMainPhone}
          />

          <FormRowCustomer
            register={register}
            label='customerMainEMail'
            defaultValue={customerMainEMail}
            maxLength={100}
            error={errors?.customerMainEMail}
          />

          <FormRowCustomer
            register={register}
            label='remarks'
            defaultValue={remarks}
            type='textarea'
          />
        </VStack>
        <VStack>
          <FormRowCustomer
            label='contactPersonName'
            defaultValue={contactPersonName}
            maxLength={30}
            register={register}
            error={errors?.contactPersonName}
          />

          <FormRowCustomer
            label='contactPersonPost'
            defaultValue={contactPersonPost}
            maxLength={50}
            register={register}
            error={errors?.contactPersonPost}
          />

          <FormRowCustomer
            label='contactPersonMobilePhone'
            defaultValue={contactPersonMobilePhone}
            register={register}
            maxLength={11}
            error={errors?.contactPersonMobilePhone}
          />

          <FormRowCustomer
            label='contactPersonPhone'
            defaultValue={contactPersonPhone}
            register={register}
            maxLength={10}
            error={errors?.contactPersonPhone}
          />

          <FormRowCustomer
            label='address'
            defaultValue={address}
            register={register}
            maxLength={80}
            error={errors?.address}
          />

          <FormRowCustomer
            label='city'
            defaultValue={city}
            register={register}
            maxLength={50}
            error={errors?.city}
          />

          <FormRowCustomer
            label='postalCode'
            defaultValue={postalCode}
            register={register}
            maxLength={7}
            error={errors?.postalCode}
          />

          <FormRowCustomer
            label='addressRemarks'
            defaultValue={addressRemarks}
            register={register}
            type='textarea'
          />
        </VStack>
      </HStack>
      <Button ref={submitRef} display='none' type='submit' />
    </form>
  );
}
type FormRowCustomerProps = {
  maxLength?: number | undefined;
  t?: TFunction<string, string>;
  register: UseFormRegister<CustomerFullDataType>;
  type?: HTMLInputTypeAttribute | undefined;
  isRequired?: boolean | undefined;
  defaultValue?: string | number | readonly string[] | undefined;
  error?: FieldError | undefined;
  label:
    | "customerID"
    | "activeContractID"
    | "customerShortName"
    | "customerName"
    | "customerStatus"
    | "customerIdentificationNumber"
    | "customerMainPhone"
    | "customerMainEMail"
    | "remarks"
    | "address"
    | "city"
    | "postalCode"
    | "addressRemarks"
    | "contactPersonName"
    | "contactPersonPhone"
    | "contactPersonPost"
    | "contactPersonMobilePhone";
};
function FormRowCustomer({
  maxLength,
  label,
  error,
  defaultValue,
  isRequired,
  register,
  type,
}: FormRowCustomerProps) {
  const { t } = useTranslation("customers");
  return (
    <FormRow
      label={t("details." + label)}
      defaultValue={defaultValue}
      error={error?.message}
      register={register(label, {
        required: isRequired ? t("form.required") : undefined,
        maxLength:
          maxLength != undefined
            ? {
                value: maxLength,
                message: t("form.too-big-text", { length: maxLength }),
              }
            : undefined,
      })}
      isRequired={isRequired}
      type={type}
    />
  );
}

function StatusSelect({
  register,
  value,
}: {
  register?: UseFormRegisterReturn<string> | undefined;
  value?: string | number | readonly string[] | undefined;
}) {
  const { t } = useTranslation("customers");
  const StatusOptions: Option[] = customerStatuses.map((customerStatus) => {
    return {
      label: t("status." + customerStatus),
      value: customerStatus,
    };
  });

  return (
    <FormControl isRequired display='flex' alignItems='center'>
      <FormLabel width='12rem'>{t("details.customerStatus")}</FormLabel>
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
