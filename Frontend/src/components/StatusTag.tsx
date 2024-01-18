import { Tag } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const statusToColor: { [index: string]: string } = {
  "in-service": "blue",
  "out-of-service": "red",
  "bank-hours": "pink",
  "cloud-server": "orange",
  "cloud-mail": "green",
  charge: "yellow",
  none: "white",
};
const StyledTag = styled.span<{ type: string }>`
  font-size: var(--scale-1);
  font-weight: var(--weight-semibold);
  border-radius: var(--radius-full);
  color: var(--color-${(props) => props.type}-100);
  background-color: var(--color-${(props) => props.type}-700);
  padding: var(--scale-0000);
`;
function StatusTag({ status }: { status: string }) {
  const { t } = useTranslation("customers", { keyPrefix: "status" });
  console.log(status);

  const statusString = status || "none"; //TODO: fix the trim
  return statusString !== "none" ? (
    <Tag
      backgroundColor={statusToColor[statusString]}
      justifyContent='center'
      size={"lg"}
      borderRadius='10px'
      padding='0 2rem 0 2rem'
    >
      {t(statusString)}
    </Tag>
  ) : null;
}

export default StatusTag;
