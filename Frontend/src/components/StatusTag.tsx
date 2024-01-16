import { useTranslation } from "react-i18next";
import styled from "styled-components";

const statusToTagName: { [index: string]: string } = {
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
  const statusString = (status || "none").trim(); //TODO: fix the trim
  return (
    <StyledTag type={statusToTagName[statusString]}>
      {statusString !== "none" && t(statusString)}
    </StyledTag>
  );
}

export default StatusTag;
