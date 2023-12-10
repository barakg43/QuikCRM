import styled, { keyframes } from "styled-components";

// Keyframes
const moveRocket = keyframes`
  100% {
    transform: translate(1200px, -600px);
  }
`;

const spinEarth = keyframes`
  100% {
    transform: rotate(-360deg);
  }
`;

const moveAstronaut = keyframes`
  100% {
    transform: translate(-160px, -160px);
  }
`;

const rotateAstronaut = keyframes`
  100% {
    transform: rotate(-720deg);
  }
`;

const glowStar = keyframes`
  40% {
    opacity: 0.3;
  }
  90%, 100% {
    opacity: 1;
    transform: scale(1.2);
    border-radius: 999999px;
  }
`;

// Styled Components
const Container = styled.div`
  margin: 0;
  min-width: 100dvh;
  min-height: 100dvh;
  font-family: "Dosis", sans-serif;
  font-weight: 300;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Stars = styled.div`
  background: url(http://salehriaz.com/404Page/img/overlay_stars.svg);
  background-repeat: repeat;
  background-size: contain;
  background-position: left top;
`;

const CustomNavbar = styled.div`
  padding-top: 15px;
`;

const BrandLogo = styled.div`
  margin-left: 25px;
  margin-top: 5px;
  display: inline-block;
`;

const NavbarLinks = styled.div`
  display: inline-block;
  float: right;
  margin-right: 15px;
  text-transform: uppercase;
`;

// Continue adding more styled components...

const Page404 = () => {
  return (
    <Container>
      <Stars>
        <CustomNavbar>
          <BrandLogo>
            {/* Add BrandLogo content */}
            <img
              src='http://salehriaz.com/404Page/img/logo.svg'
              width='80px'
              alt='Logo'
            />
          </BrandLogo>
          <NavbarLinks>
            {/* Add NavbarLinks content */}
            <ul>
              <li>
                <a href='http://salehriaz.com/404Page/404.html' target='_blank'>
                  Home
                </a>
              </li>
              <li>
                <a href='http://salehriaz.com/404Page/404.html' target='_blank'>
                  About
                </a>
              </li>
              <li>
                <a href='http://salehriaz.com/404Page/404.html' target='_blank'>
                  Features
                </a>
              </li>
              <li>
                <a
                  href='http://salehriaz.com/404Page/404.html'
                  className='btn-request'
                  target='_blank'
                >
                  Request A Demo
                </a>
              </li>
            </ul>
          </NavbarLinks>
        </CustomNavbar>

        {/* Continue adding more components... */}
      </Stars>
    </Container>
  );
};

export default Page404;
