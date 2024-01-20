import styled from "styled-components";
import SideBar from "../components/Sidebar";
import TopHeader from "../components/TopHeader";
import { Outlet } from "react-router-dom";

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
const Container = styled.div`
  display: flex;
  flex-grow: 1 1 0;
  /* height: 100vw; */
  justify-content: center;
  gap: 3.2rem;
  margin: 0 auto;
  flex-direction: row;
`;
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
          <Container>
            <Outlet />
          </Container>
        </Main>
      </MainContainer>
    </StyledAppLayout>
  );
}

export default AppLayout;
{
  /* <StyledAppLayout>
<Header />
<Main>
  <Container>
    <Outlet />
  </Container>
</Main>
</StyledAppLayout> */
}
// const Main = styled.main`
//   background-color: var(--color-grey-50);
//   padding: 4rem 4.8rem 6.4rem;
//   overflow: scroll;
// `;
// const StyledAppLayout = styled.main`
//   display: grid;
//   height: 100vh;
//   grid-template-rows: auto 1fr;
//   grid-template-columns: 26rem 1fr;
// `;
// const Container = styled.div`
//   max-width: 120rem;
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column;
//   gap: 3.2rem;
// `;
