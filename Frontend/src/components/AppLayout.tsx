import styled from "styled-components";
import SideBar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const StyledAppLayout = styled.div`
  display: flex;
  height: 100vh;

  /* grid-template-rows: auto 1fr;
  grid-template-columns: 10rem 1fr; */
`;
const Main = styled.main`
  /* display: flex; */
  /* flex-direction: column; */
  max-width: 120rem;
  flex: 1 1 0%;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <SideBar />
      <Main>
        <Header />
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
