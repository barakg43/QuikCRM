import {
  Box,
  LayoutProps,
  Stack,
  StackDirection,
  Text,
  UseRadioGroupProps,
  UseRadioProps,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface CustomRadioGroupProps extends UseRadioGroupProps {
  options: Option[];
  defaultValue: string;
  direction?: StackDirection | undefined;
  buttonWidth?: React.PropsWithoutRef<LayoutProps["width"]>;
  label?: string | undefined;
  register?: UseFormRegisterReturn<string> | undefined;
}

const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({
  options,
  defaultValue,
  onChange,
  buttonWidth,
  label,
  register,
  direction = "row",
  ...props
}) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    defaultValue,
    ...props,
  });

  const group = getRootProps();

  return (
    <Stack {...group} direction={direction} height={"100%"}>
      {label && (
        <Text textAlign={"center"} alignContent={"center"}>
          {label}
        </Text>
      )}
      {options.map((option) => (
        <RadioCard
          key={option.value}
          {...getRadioProps({
            value: option.value,
            width: buttonWidth,
            register,
          })}
          onChange={(event) => onChange?.(event?.target?.value)}
        >
          {option.label}
        </RadioCard>
      ))}
    </Stack>
  );
};

interface Option {
  label: string;
  value: string;
}

type RadioButtonProps = UseRadioProps & {
  label?: string;
  width?: React.PropsWithoutRef<LayoutProps["width"]>;
  children?: React.ReactNode;
  register?: UseFormRegisterReturn<string> | undefined;
};
function RadioCard(props: RadioButtonProps) {
  const { register = { onChange: () => {} }, onChange, ...radioProps } = props;
  const { state, getInputProps, getRadioProps, htmlProps, getLabelProps } =
    useRadio(radioProps);
  const { onChange: registerOnChange, ...registerProps } = register;
  const { onChange: inputOnChange, ...inputProps } = getInputProps();
  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    inputOnChange?.(event);
    onChange?.(event);
    registerOnChange(event);
  }
  return (
    <Box cursor='pointer' textAlign='center' as='label' {...htmlProps}>
      <input
        {...inputProps}
        {...registerProps}
        onChange={changeHandler}
        hidden
      />
      <Box
        {...getRadioProps()}
        bg={state.isChecked ? "teal.200" : "transparent"}
        p={1}
        rounded='full'
        borderWidth='2px'
        boxShadow='md'
      >
        <Text textAlign='center' {...getLabelProps()}>
          {props.children}
        </Text>
      </Box>
    </Box>
  );
}
export default CustomRadioGroup;
