import { ChangeEventHandler, Key } from "react";
import styled from "styled-components";

export type Option = {
  value: string | number | readonly string[] | undefined;
  label: string | number | undefined;
};

const StyledSelect = styled.select<{ type: "white" | "dark" }>`
  font-size: var(--scale-00);
  padding: var(--size-1);
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
`;

type SelectProps = {
  options: Option[];
  value?: string | number | readonly string[] | undefined;
  onChange?: ChangeEventHandler<HTMLSelectElement> | undefined;
  props?: object;
};

function Select({ options, value, onChange, ...props }: SelectProps) {
  return (
    <StyledSelect value={value} onChange={onChange} {...props}>
      {options.map((option) => (
        <option value={option.value} key={option.value as Key}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
