import styled from "styled-components";
import LanguageSelector from "../i18n/LanguageSelector";

const StyledHeader = styled.header`
  display: flex;
  font-size: var(--scale-000);
  background-color: var(--color-emerald-100);
  padding: 0.5rem 1rem;
  align-items: center;
  gap: 2.4rem;
  justify-content: flex-end;
  border-bottom: 1px solid var(--color-grey-100);
`;

function Header() {
  return (
    <StyledHeader>
      <LanguageSelector />
    </StyledHeader>
  );
}

export default Header;
