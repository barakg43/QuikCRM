import styled, { css } from "styled-components";

type RowProps = {
  type?: "horizontal" | "vertical";
  "justify-content"?:
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "initial"
    | "inherit";
  gap?: number;
};

const Row = styled.div<RowProps>`
  display: flex;
  ${(props) => css`
    justify-content: ${props["justify-content"]};
    gap: ${props.gap ? props.gap + "rem" : "0"};
  `}
  ${(props) =>
    props.type === "horizontal" &&
    css`
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
    `}
`;

Row.defaultProps = {
  type: "vertical",
  "justify-content": "flex-start",
  gap: 0,
};

export default Row;
