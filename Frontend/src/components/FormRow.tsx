import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  SystemStyleObject,
  Textarea,
} from "@chakra-ui/react";
import { HTMLInputTypeAttribute } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
type FromRowProps = {
  label: string;
  type?: HTMLInputTypeAttribute | undefined;
  register?: UseFormRegisterReturn<string> | undefined;
  isRequired?: boolean;
  error?: string | undefined;
  defaultValue?: string | number | readonly string[] | undefined;
  sx?: SystemStyleObject | undefined;
};
function FormRow({
  label,
  defaultValue,
  type = "text",
  register,
  error,
  isRequired = false,
  sx,
}: FromRowProps) {
  return (
    <FormControl
      isRequired={isRequired}
      display='flex'
      alignItems='center'
      isInvalid={error !== undefined}
      sx={sx}
    >
      <FormLabel width='12rem' fontSize='1.25rem' fontWeight={600}>
        {label}
      </FormLabel>
      {type === "textarea" ? (
        <Textarea
          placeholder={label}
          variant='flushed'
          defaultValue={defaultValue || ""}
          fontSize='1.1rem'
          {...register}
        />
      ) : (
        <Input
          type={type}
          defaultValue={defaultValue || ""}
          placeholder={label}
          variant='flushed'
          fontSize='1.1rem'
          {...register}
        />
      )}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
}
export default FormRow;
