import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: var(--scale-0);
    padding: 0.2rem 0.2rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: var(--scale-3);
    padding: var(--scale-1) var(--scale-3);
    font-weight: 500;
  `,
  large: css`
    font-size: var(--scale-4);
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-primary-600);
    background: var(--color-primary-0);
    border: 1px solid var(--color-primary-200);

    &:hover {
      background-color: var(--color-brand-200);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

type ButtonProps = {
  variation?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
};
const Button = styled.button<ButtonProps>`
  border: none;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-md);
  &:focus {
    outline: none;
  }
  ${(props) => sizes[props.size || "medium"]}
  ${(props) => variations[props.variation || "primary"]}
`;

Button.defaultProps = {
  variation: "primary",
  size: "medium",
};

export default Button;
