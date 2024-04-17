import { Container, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Logo() {
  const imgSrc = "/quik/assets/logo/logo.webp";
  const navigate = useNavigate();
  return (
    <Container centerContent maxHeight='11rem'>
      <Image
        src={imgSrc}
        alt='logo'
        maxHeight='13rem'
        display='block'
        paddingTop='1rem'
        onClick={() => navigate("/")}
        cursor='pointer'
      />
    </Container>
  );
}

export default Logo;
