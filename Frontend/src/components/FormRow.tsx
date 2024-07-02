import {
  Checkbox,
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

      {ReactComponentInput({ type, label, defaultValue, register })}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
}

function ReactComponentInput({
  type,
  label,
  defaultValue,
  register,
}: {
  label: string;
  type?: HTMLInputTypeAttribute | undefined;
  defaultValue?: string | number | readonly string[] | undefined;
  register?: UseFormRegisterReturn<string> | undefined;
}) {
  switch (type) {
    case "checkbox":
      return (
        <Checkbox
          placeholder={label}
          variant='flushed'
          defaultValue={defaultValue || ""}
          fontSize='1.1rem'
          {...register}
        />
      );
    case "textarea":
      return (
        <Textarea
          placeholder={label}
          variant='flushed'
          defaultValue={defaultValue || ""}
          fontSize='1.1rem'
          {...register}
        />
      );
    default:
      return (
        <Input
          type={type}
          defaultValue={defaultValue || ""}
          placeholder={label}
          variant='flushed'
          fontSize='1.1rem'
          {...register}
        />
      );
  }
}
export default FormRow;
