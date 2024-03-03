import { Flex } from "@chakra-ui/react";
import LanguageSelector from "../i18n/LanguageSelector";

function TopHeader() {
  return (
    <Flex
      as='header'
      fontSize='x-large'
      justifyContent='flex-end'
      borderBottom='2px solid var(--color-primary-300)'
      boxShadow='xl'
      gap='2.4rem'
      padding='0.5rem 1rem'
      bgColor={"var(--color-primary-0)"}
      height='5rem'
      alignItems='center'
    >
      <LanguageSelector />
    </Flex>
  );
}

export default TopHeader;
