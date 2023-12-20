import styled from "styled-components";
import SideBar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const StyledAppLayout = styled.div`
  display: flex;
  height: 100vh;
`;
const Main = styled.div`
  max-width: 120rem;
  flex: 1 1 0%;
  background-color: var(--color-primary-100);
`;
const Container = styled.main`
  display: flex;
  justify-content: center;
  flex: 1 1 0;
  max-width: 120rem;
  margin: 0 auto;
  flex-direction: column;
  padding: 1rem 1.5rem 0;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <SideBar />
      <Main>
        <Header />
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
