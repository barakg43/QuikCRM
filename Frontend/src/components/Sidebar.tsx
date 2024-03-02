import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { HStack, VStack } from "@chakra-ui/react";

const StyledSideBar = styled.aside`
  display: flex;
  /* grid-row: 1/-1; */
  /* grid-template-columns: auto; */
  /* grid-template-rows: var(--size-44) 1fr; */
  flex-direction: column;
  /* align-items: start; */
  gap: var(--scale-5);
  color: var(--color-primary-100);
  background-color: var(--color-primary-950);
  border-right: 1px solid var(--color-primary-200);
  transition: width 300ms ease-in-out;
  overflow-x: clip;
  width: 20rem;

  &:hover span {
    opacity: 100;
  }
`;

function Sidebar() {
  return (
    <VStack justifyContent='start' gap='10rem' w='20rem'>
      <Logo />
      <MainNav />
    </VStack>
  );
}

export default Sidebar;
