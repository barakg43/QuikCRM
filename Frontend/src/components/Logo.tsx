import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
  width: inherit;
  background-color: var(--color-emerald-950);
  padding-bottom: var(--scale-00);
`;

const Img = styled.img`
  padding: var(--size-2) var(--size-2) 0 var(--size-2);
  max-width: 5rem;
  height: auto;
  width: inherit;
`;

function Logo() {
  const imgSrc = "/assets/logo/logo.webp";
  return (
    <StyledLogo>
      <Img src={imgSrc} alt='logo' />
    </StyledLogo>
  );
}

export default Logo;
