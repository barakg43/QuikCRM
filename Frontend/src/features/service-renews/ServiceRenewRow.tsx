import { useNavigate } from "react-router-dom";
import { ServiceRenewRecord } from "./serviceRenews";
import { BodyTableCell } from "../customers/BodyTableCell";
import CustomTable from "../../components/CustomTable";
import { useTranslation } from "react-i18next";
import { Button, Tag, Td } from "@chakra-ui/react";

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
      <Td textAlign={"center"}>
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
      </Td>
      <Td>
        <Button
          _focus={{ outline: "none", "box-shadow": "none" }}
          _hover={{ backgroundColor: "teal.500", color: "white" }}
          onClick={handleRenew}
          fontSize={"xl"}
          padding={"0.5rem 3rem 0.5rem 3rem"}
        >
          {t("renew-button")}
        </Button>
      </Td>
    </CustomTable.Row>
  );
}

export default ServiceRenewRow;
