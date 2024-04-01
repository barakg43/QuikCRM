import { Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

function Empty({ resource }: { resource: string }) {
  const { t } = useTranslation("components");
  return (
    <Text fontSize='1.2rem' fontWeight={500} textAlign='center' margin='2.4rem'>
      {t("empty", { resource })}
    </Text>
  );
}
export default Empty;
