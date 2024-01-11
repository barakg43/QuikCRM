import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: var(--scale-4);
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: var(--scale-3);
      font-weight: 600;
    `}
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: var(--scale-2);
      font-weight: var(--weight-bold);
    `}
    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: var(--scale-1);
      font-weight: 600;
      text-align: center;
    `}
  line-height:1.4
`;
export default Heading;
