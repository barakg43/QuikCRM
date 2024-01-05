import styled from "styled-components";

const ButtonGroup = styled.div<{ padding: string }>`
  display: flex;
  gap: 1.2rem;
  padding: ${(props) => props.padding};
  justify-content: flex-end;
`;

export default ButtonGroup;
