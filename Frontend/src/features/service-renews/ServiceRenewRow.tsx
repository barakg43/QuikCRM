import { useNavigate } from "react-router-dom";
import { ServiceRenewRecord } from "./serviceRenews";
import { BodyTableCell } from "../customers/BodyTableCell";
import CustomTable from "../../components/CustomTable";
import { useTranslation } from "react-i18next";
import { Button, Tag } from "@chakra-ui/react";

const periodColors = {
  MONTHLY: "blue",
  QUARTERLY: "green",
  YEARLY: "gray",
};
function ServiceRenewRow({
  contractID,
  customerID,
  customerShortName,
  contactDescription,
  finishDateOfContract,
  startDateOfContract,
  contractPrice,
  periodKind,
  onRenew,
}: ServiceRenewRecord & {
  onRenew: (serviceRenew: ServiceRenewRecord) => void;
}) {
  const navigate = useNavigate();
  const { t } = useTranslation("serviceRenews", { keyPrefix: "renew-table" });
  // contractID: number;
  // customerID: number;
  // customerShortName: string;
  // startDateOfContract: Date;
  // finishDateOfContract: Date;
  // contractPrice: number;
  // periodKind: "MONTHLY" | "QUARTERLY" | "YEARLY";
  // contactDescription: string;
  function handleRenew() {
    onRenew({
      contractID,
      customerID,
      customerShortName,
      startDateOfContract,
      finishDateOfContract,
      contractPrice,
      periodKind,
      contactDescription,
    });
  }
  return (
    <CustomTable.Row height='5.6rem'>
      <BodyTableCell
        text={customerShortName}
        onClick={() => navigate(`/customers/${customerID}`)}
      />
      <BodyTableCell
        text={new Date(startDateOfContract).toLocaleDateString("en-GB")}
      />
      <BodyTableCell
        text={new Date(finishDateOfContract).toLocaleDateString("en-GB")}
      />
      <Tag
        backgroundColor={periodColors[periodKind]}
        justifyContent='center'
        size='xl'
        borderRadius='20px'
        padding='0.5rem 5rem 0.5rem 5rem'
        margin='auto'
      >
        {t("period." + periodKind)}
      </Tag>
      <Button onClick={handleRenew}>{t("renew-button")}</Button>
    </CustomTable.Row>
  );
}

export default ServiceRenewRow;
