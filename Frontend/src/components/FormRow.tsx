import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { HTMLInputTypeAttribute } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
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
      <FormLabel width='12rem' fontSize='1.25rem'>
        {label}
      </FormLabel>
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
export default FormRow;
