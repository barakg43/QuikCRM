import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { CustomerFullDataType } from "../customers";
import { useParams } from "react-router-dom";
import { useCustomer } from "./useCustomer";
import LoadingSpinner from "./../../../components/LoadingSpinner.tsx";
// customerID,
// customerShortName,
// customerStatus,
// customerName,
// customerIdentificationNumber,
// customerMainPhone,
// customerMainEMail,
// remarks,
// address,
// city,
// postalCode,
// addressRemarks,
// contactPersonName,
// contactPersonMobilePhone,
function CustomerForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  function onSubmit(data) {
    console.log(data);
  }
  const { customerId } = useParams();
  // console.log("customerId", customerId);
  const {
    customer: {
      customerID,
      customerShortName,
      customerStatus,
      customerName,
      customerIdentificationNumber,
      customerMainPhone,
      customerMainEMail,
      remarks,
      address,
      city,
      postalCode,
      addressRemarks,
      contactPersonName,
      contactPersonMobilePhone,
    } = {},
    isLoading,
  } = useCustomer(Number(customerId));
  if (isLoading) return <LoadingSpinner />;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired>
        <FormLabel>First name</FormLabel>
        <Input placeholder='First name' />
      </FormControl>

      <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
        Save
      </Button>
    </form>
  );
}

export default CustomerForm;
