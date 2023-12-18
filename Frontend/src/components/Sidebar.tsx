import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSideBar = styled.aside`
  display: grid;
  /* grid-row: 1/-1; */
  grid-template-rows: var(--size-44) 1fr;
  flex-direction: column;
  align-items: start;
  color: var(--color-emerald-100);
  background-color: var(--color-emerald-900);
  border-right: 1px solid var(--color-emerald-200);
  transition: width 300ms ease-in-out;
  overflow-x: clip;
  width: 3.25rem;
  &:hover {
    width: 9rem;
  }

  &:hover span {
    opacity: 100;
  }
`;

function Sidebar() {
  return (
    <StyledSideBar>
      <Logo />
      <MainNav />
    </StyledSideBar>
  );
}

export default Sidebar;
