import { useTranslation } from "react-i18next";

function Empty({ resource }: { resource: string }) {
  const { t } = useTranslation("components");

  return <p>{t("empty", { resource })}</p>;
}
export default Empty;
