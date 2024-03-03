import { Container, Image } from "@chakra-ui/react";
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
    <Container maxHeight='11rem'>
      <Image
        src={imgSrc}
        alt='logo'
        maxHeight='13rem'
        display='block'
        margin='auto'
        paddingTop='1rem'
        width='50%'
      />
    </Container>
  );
}

export default Logo;
