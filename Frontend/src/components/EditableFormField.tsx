import styled, { css } from "styled-components";
import Input from "./Input";

const StyledEditableFormField = styled.div<{ as: string }>`
  display: flex;
  flex-direction: row;
  gap: var(--scale-2);
  align-items: center;
  align-content: center;
  height: var(--scale-8);
  & label {
    text-align: center;
    ${(props) =>
      props.as === "textarea" &&
      css`
        align-self: flex-start;
      `}
    min-width: 100px;
  }
`;

type EditableFormFieldProps = {
  isEditing: boolean;
  label: string;
  value: string | null | undefined;
  id: string;
  as?: string;
};
function EditableFormField({
  id,
  label,
  value,
  isEditing,
  as,
}: EditableFormFieldProps) {
  return (
    <StyledEditableFormField>
      {label !== "" && <label htmlFor={id}>{`${label}:`}</label>}
      {isEditing ? (
        <Input as={as} id={id} defaultValue={value || ""} />
      ) : (
        <span>{value || ""}</span>
      )}
    </StyledEditableFormField>
  );
}

export default EditableFormField;
