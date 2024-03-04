import {
  LayoutProps,
  Select,
  SelectProps as ChakraSelectProps,
} from "@chakra-ui/react";
import { ChangeEventHandler, Key } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export type Option = {
  value: string | number | readonly string[] | undefined;
  label: string | number | undefined;
};

type SelectProps = {
  options: Option[];
  value?: string | number | readonly string[] | undefined;
  onChange?: ChangeEventHandler<HTMLSelectElement> | undefined;
  props?: ChakraSelectProps;
  register?: UseFormRegisterReturn<string> | undefined;
  width?: React.PropsWithoutRef<LayoutProps["width"]>;
};

function StyledSelect({
  options,
  value,
  width,
  register,
  onChange,
  ...props
}: SelectProps) {
  return (
    <Select
      variant='flushed'
      value={value}
      onChange={onChange}
      {...props}
      display='flex'
      // textAlign='end'
      sx={{ textAlignLast: "center" }}
      width={width}
      {...register}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value as Key}>
          {option.label}
        </option>
      ))}
    </Select>
  );
}

export default StyledSelect;
