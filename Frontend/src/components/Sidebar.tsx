import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSideBar = styled.aside`
  display: flex;
  /* grid-row: 1/-1; */
  flex-direction: column;
  align-items: start;
  background-color: var(--color-emerald-500);
  border-right: 1px solid var(--color-emerald-200);
  transition: width 300ms ease-in-out;
  overflow-x: clip;
  width: var(--size-20);
  &:hover {
    width: var(--size-64);
  }

  &:hover span {
    opacity: 100;
  }
`;

function Sidebar() {
  return (
    <StyledSideBar>
      {/* <Logo /> */}
      <MainNav />
    </StyledSideBar>
  );
}

export default Sidebar;
