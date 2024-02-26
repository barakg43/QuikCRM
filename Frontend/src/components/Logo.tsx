import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
  width: inherit;
  min-height: 5.25rem;

  background-color: var(--color-primary-950);
  /* padding-bottom: var(--scale-00); */
  /* margin-bottom: var(--scale-5); */
`;

const Img = styled.img`
  padding: var(--size-2) var(--size-2) 0 var(--size-2);
  /* max-width: 5rem; */
  height: auto;
  max-height: 5.25rem;
  width: auto;
`;

function Logo() {
  const imgSrc = "assets/logo/logo.webp";
  return (
    <StyledLogo>
      <Img src={imgSrc} alt='logo' />
    </StyledLogo>
  );
}

export default Logo;
