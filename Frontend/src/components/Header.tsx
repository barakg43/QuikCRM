import styled from "styled-components";
import LanguageSelector from "../i18n/LanguageSelector";

const StyledHeader = styled.header`
  display: flex;
  font-size: var(--scale-00);
`;

function Header() {
  return (
    <StyledHeader>
      <LanguageSelector />
    </StyledHeader>
  );
}

export default Header;
