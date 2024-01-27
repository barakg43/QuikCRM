import { Box, Container, Flex, Portal } from "@chakra-ui/react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import "./../styles/LoadingSpinner.css";
const StyledLoadingSpinner = styled.div``;

function LoadingSpinner() {
  return createPortal(<LoadingContainer />, document.body);
}

function LoadingContainer() {
  return (
    <Container
      position='fixed'
      centerContent
      display='flex'
      minHeight='100vh'
      minW='100%'
      alignItems='center'
      justifyContent='center'
      top={0}
      left={0}
      zIndex={1000}
    >
      <Box alignItems='stretch' className='bars-5'></Box>
    </Container>
  );
}

export default LoadingSpinner;
