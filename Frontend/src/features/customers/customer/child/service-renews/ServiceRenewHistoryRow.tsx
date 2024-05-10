import { Button, Td } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import CustomTable from "../../../../../components/CustomTable";
import { useDeleteServiceContract } from "../../../../service-renews/hooks/useDeleteServiceContract";
import { BodyTableCell } from "../../../BodyTableCell";

type ServiceRenewHistoryProps = {
  contractID: number;
  startDateOfContract: Date;
  finishDateOfContract: Date;
  contractPrice: number;
  contactDescription: string;
};
function ServiceRenewHistoryRow({
  contractID,
  contactDescription,
  finishDateOfContract,
  startDateOfContract,
  contractPrice,
}: ServiceRenewHistoryProps) {
  const { t } = useTranslation("components", { keyPrefix: "buttons" });
  const { deleteServiceContract, isPending } = useDeleteServiceContract();
  function handleDelete() {
    deleteServiceContract(contractID);
  }
  return (
    <CustomTable.Row height='5.6rem'>
      <BodyTableCell text={contractID} />
      <BodyTableCell
        text={new Date(startDateOfContract).toLocaleDateString("en-GB")}
      />
      <BodyTableCell
        text={new Date(finishDateOfContract).toLocaleDateString("en-GB")}
      />
      <BodyTableCell text={contactDescription} />
      <BodyTableCell text={contractPrice} />
      <Td>
        <Button
          _focus={{ outline: "none", "box-shadow": "none" }}
          isLoading={isPending}
          _hover={{ backgroundColor: "teal.500", color: "white" }}
          onClick={handleDelete}
          fontSize={"xl"}
          padding={"0.5rem 3rem 0.5rem 3rem"}
        >
          {t("delete")}
        </Button>
      </Td>
    </CustomTable.Row>
  );
}

export default ServiceRenewHistoryRow;
