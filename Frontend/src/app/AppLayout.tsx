import styled from "styled-components";
import SideBar from "../components/Sidebar";
import TopHeader from "../components/TopHeader";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Flex,
  GridItem,
  HStack,
  Text,
} from "@chakra-ui/react";

const StyledAppLayout = styled.div`
  display: flex;
  height: 100vh;
  width: 100dvw;
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  background-color: var(--color-primary-100);
`;
// const Container = styled.div`
//   display: flex;
//   flex-grow: 1 1 0;
//   /* height: 100vw; */
//   justify-content: center;
//   gap: 3.2rem;
//   margin: 0 auto;
//   flex-direction: row;
// `;
const Main = styled.main`
  background-color: var(--color-primary-100);
  padding: 2rem;
  height: 100vh;
  overflow-y: scroll;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <SideBar />
      <MainContainer>
        <TopHeader />
        <Main>
          <Container centerContent display='flex' minH='100%' minW='100%'>
            <Outlet />
          </Container>
        </Main>
      </MainContainer>
    </StyledAppLayout>
  );
}
export default AppLayout;
