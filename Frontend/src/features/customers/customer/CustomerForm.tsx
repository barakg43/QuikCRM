import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { CustomerFullDataType } from "../customers";

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
  return (+62
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired>
        <FormLabel>First name</FormLabel>
        <Input placeholder='First name' />
      </FormControl>
      s
      <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
        Save
      </Button>
    </form>
  );
}

export default CustomerForm;
