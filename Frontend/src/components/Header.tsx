import styled from "styled-components";
import LanguageSelector from "../i18n/LanguageSelector";

const StyledHeader = styled.header`
  display: flex;
  font-size: var(--scale-000);
  background-color: var(--color-primary-100);
  padding: 0.5rem 1rem;
  align-items: center;
  gap: 2.4rem;
  justify-content: flex-end;
  border-bottom: 2px solid var(--color-primary-300);
  box-shadow: var(--shadow-xl);
`;

function Header() {
  return (
    <StyledHeader>
      <LanguageSelector />
    </StyledHeader>
  );
}

export default Header;
