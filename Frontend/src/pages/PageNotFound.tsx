import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import styled, { keyframes } from "styled-components";

const glowStar = keyframes`
  40% {
    opacity: 0.3;
  }
  90%,
  100% {
    opacity: 1;
    transform: scale(1.2);
    border-radius: 999999px;
  }
`;

const rocketMovement = keyframes`
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

const Container = styled.div`
  background: url(/assets/404Page/img/bg_purple.png);
  background-repeat: repeat-x;
  background-size: cover;
  background-position: left top;
  height: 100dvh;
  overflow: hidden;
`;

const Stars = styled.div`
  background: url(/assets/404Page/img/overlay_stars.svg);
  background-repeat: repeat;
  background-size: contain;
  background-position: left top;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
const GlowingStars = styled.div`
  position: absolute;
  border-radius: 100%;
  background-color: #fff;
  width: 3px;
  height: 3px;
  opacity: 0.3;
  will-change: opacity;
`;
const Star = styled.div`
  position: absolute;
  border-radius: 100%;
  background-color: #fff;
  width: 3px;
  height: 3px;
  opacity: 0.3;
  animation: ${glowStar} 2s infinite ease-in-out alternate 1s;

  &:nth-child(2) {
    top: 20%;
    left: 40%;
    animation: ${glowStar} 2s infinite ease-in-out alternate 3s;
  }

  &:nth-child(3) {
    top: 25%;
    left: 25%;
    animation: ${glowStar} 2s infinite ease-in-out alternate 5s;
  }

  &:nth-child(4) {
    top: 75%;
    left: 80%;
    animation: ${glowStar} 2s infinite ease-in-out alternate 7s;
  }

  **:nth-child(5) {
    top: 90%;
    left: 50%;
    animation: ${glowStar} 2s infinite ease-in-out alternate 9s;
  }
`;

const Content = styled.div`
  min-height: 100%;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: lightskyblue;
  /* z-index: 1;*/
  /* position: relative;  */
  text-align: center;
  padding: 17% 5% 10% 5%;
`;

const NavLink = styled.a`
  color: #fff;
  text-decoration: none;
  letter-spacing: 2px;
  font-size: 12px;
  transition: all 0.3s ease-in;

  &:hover {
    color: #ffcb39;
  }
`;
// const RequestButton = styled.button`
//   padding: 10px 25px;
//   border: 1px solid #ffcb39;
//   border-radius: 100px;
//   font-weight: 400;
//   background-color: #29243e;
//   color: #fff;
//   transition: all 0.3s ease-in;

//   &:hover {
//     background-color: #ffcb39;
//     transform: scale(1.05);
//     box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.1);
//   }
// `;

type StyledNavLinkProps = {
  to: string;
};
const StyledNavLink = styled(NavLink)<StyledNavLinkProps>`
  position: relative;
  z-index: 200;
  margin: 15px auto;
  width: 100px;
  padding: 10px 15px;
  border: 1px solid #ffcb39;
  border-radius: 100px;
  font-weight: 400;
  display: block;
  color: white;
  text-align: center;
  text-decoration: none;
  letter-spacing: 2px;
  font-size: 11px;

  transition: all 0.3s ease-in;

  &:hover {
    background-color: #ffcb39;
    color: #fff;
    transform: scale(1.05);
    box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.1);
  }
`;

const Image404 = styled.img`
  width: 300px;
  position: relative;
  z-index: 100;
  pointer-events: none;
`;

const Objects = styled.div`
  /* position: relative;
  z-index: 90; */
  & img {
    z-index: 90;
    pointer-events: none;
  }
`;

const Rocket = styled.img`
  z-index: 95;
  position: absolute;
  width: 40px;
  transform: translateX(-50px);
  top: 75%;
  pointer-events: none;
  animation: ${rocketMovement} 200s linear infinite both running;
`;

const Earth = styled.img`
  position: absolute;
  width: 100px;
  top: 20%;
  left: 15%;
  z-index: 90;
  animation: ${spinEarth} 100s infinite linear both;
`;

const Moon = styled.img`
  position: absolute;
  top: 12%;
  left: 25%;
  width: 80px;
`;
const EarthMoon = styled.div`
  /* position: relative; */
`;

const AstronautBox = styled.div`
  z-index: 110 !important;
  position: absolute;
  width: 140px;
  top: 60%;
  right: 20%;
  will-change: transform;
  animation: ${moveAstronaut} 50s infinite linear both alternate;
`;

const Astronaut = styled.img`
  animation: ${rotateAstronaut} 200s infinite linear both alternate;
`;

function PageNotFound() {
  const { t } = useTranslation("pageNotFound");

  return createPortal(
    <Container>
      <Stars>
        <Content>
          <Image404 src={"/assets/404Page/img/404.svg"} alt='404 image' />
          <p>
            {t("errorMessageFirstPart")} <br />
            <strong> {t("errorMessageSecondPart")}</strong>
          </p>
          <StyledNavLink to='/'>{t("button")}</StyledNavLink>
        </Content>
        <Objects>
          <Rocket src='/assets/404Page/img/rocket.svg' alt='Rocket' />
          <EarthMoon>
            <Earth src='/assets/404Page/img/earth.svg' alt='Earth' />
            <Moon src='/assets/404Page/img/moon.svg' alt='Moon' />
          </EarthMoon>
          <AstronautBox>
            <Astronaut
              src='/assets/404Page/img/astronaut.svg'
              alt='Astronaut'
            />
          </AstronautBox>
        </Objects>
        <GlowingStars>
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
        </GlowingStars>
      </Stars>
    </Container>,
    document.body
  );
}

export default PageNotFound;
