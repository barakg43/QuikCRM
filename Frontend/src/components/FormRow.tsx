import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  VStack,
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
};
function FormRow({
  label,
  defaultValue,
  type = "text",
  register,
  error,
  isRequired = false,
}: FromRowProps) {
  return (
    <FormControl isRequired={isRequired} display='flex' alignItems='center'>
      <FormLabel width='12rem' fontSize='1.25rem'>
        {label}
      </FormLabel>
      <VStack>
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
        {error && (
          <Text color='red.500' fontSize='1rem' fontWeight='bold'>
            {error}
          </Text>
        )}
      </VStack>
    </FormControl>
  );
}
export default FormRow;
