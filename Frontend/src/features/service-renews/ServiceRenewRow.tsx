import { Button, Tag } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../components/CustomTable";
import { ServiceRenewRecord } from "./serviceRenews";

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
  const Cell = CustomTable.Row.Cell;
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
      <Cell onClick={() => navigate(`/customers/${customerID}`)}>
        {customerShortName}
      </Cell>
      <Cell>{new Date(startDateOfContract).toLocaleDateString("en-GB")}</Cell>
      <Cell>{new Date(finishDateOfContract).toLocaleDateString("en-GB")}</Cell>
      <Cell>
        <Tag
          backgroundColor={periodColors[periodKind]}
          justifyContent='center'
          size='xl'
          borderRadius='full'
          padding='0.5rem 0 0.5rem 0'
          w={"15rem"}
          margin='auto'
          color={`${periodColors[periodKind]}.50`}
        >
          {t("period." + periodKind)}
        </Tag>
      </Cell>
      <Cell>
        <Button
          _focus={{ outline: "none", boxShadow: "none" }}
          _hover={{ backgroundColor: "teal.500", color: "white" }}
          onClick={handleRenew}
          fontSize={"xl"}
          padding={"0.5rem 3rem 0.5rem 3rem"}
        >
          {t("renew-button")}
        </Button>
      </Cell>
    </CustomTable.Row>
  );
}

export default ServiceRenewRow;
