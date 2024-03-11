import { Box, Container, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/Sidebar";
import TopHeader from "../components/TopHeader";

// const StyledAppLayout = styled.div`
//   display: flex;
//   height: 100vh;
//   width: 100dvw;
// `;
// const MainContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   flex: 1;

//   background-color: var(--color-primary-100);
// `;
// const Container = styled.div`
//   display: flex;
//   flex-grow: 1 1 0;
//   /* height: 100vw; */
//   justify-content: center;
//   gap: 3.2rem;
//   margin: 0 auto;
//   flex-direction: row;
// `;
// const Main = styled.main`
//   background-color: var(--color-primary-100);
//   padding: 2rem;
//   height: 100vh;
//   overflow-y: scroll;
// `;

function AppLayout() {
  return (
    <Flex h='100vh' w='100dvw'>
      <SideBar />
      <Flex flexDir='column' grow={1}>
        <TopHeader />
        <Box
          as='main'
          padding='2rem'
          height='100vh'
          overflowY='scroll'
          bg='var(--color-primary-100)'
        >
          <Container centerContent display='flex' minH='100%' minW='100%'>
            <Outlet />
          </Container>
        </Box>
      </Flex>
    </Flex>
  );
}
export default AppLayout;
