import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 5rem;
  width: auto;
`;

function Logo() {
  const imgSrc = "/logo/quikcrm-high-resolution-logo-transparent (2).png";
  return (
    <StyledLogo>
      <Img src={imgSrc} alt='logo' />
    </StyledLogo>
  );
}

export default Logo;
