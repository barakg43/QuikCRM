import styled from "styled-components";
import SideBar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const StyledAppLayout = styled.div`
  display: flex;
  height: 100vh;
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 120rem;
  /* flex: 1 1 0%; */
  background-color: var(--color-primary-0);
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  max-width: 120rem;
  gap: 3.2rem;
  margin: 0 auto;
  flex-direction: column;
`;
const Main = styled.main`
  background-color: var(--color-primary-100);
  padding: 2rem;
  overflow-y: scroll;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <SideBar />
      <MainContainer>
        <Header />
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
