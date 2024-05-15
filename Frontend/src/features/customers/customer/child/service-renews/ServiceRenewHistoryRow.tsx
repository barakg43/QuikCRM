import { useTranslation } from "react-i18next";
import CustomTable from "../../../../../components/CustomTable";
import DeleteAlertDialog from "../../../../../components/DeleteAlertDialog";
import { useDeleteServiceContract } from "../../../../service-renews/hooks/useDeleteServiceContract";

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
  const { t } = useTranslation("serviceRenews");
  const { deleteServiceContract, isPending } = useDeleteServiceContract();
  const fontSize = "small";
  const Cell = CustomTable.Row.Cell;
  function handleDelete() {
    console.log("contractID", contractID);
    // deleteServiceContract(contractID);
  }
  return (
    <CustomTable.Row height='5.6rem'>
      <Cell fontSize={fontSize}>{contractID}</Cell>
      <Cell fontSize={fontSize}>
        {new Date(startDateOfContract).toLocaleDateString("en-GB")}
      </Cell>
      <Cell fontSize={fontSize}>
        {new Date(finishDateOfContract).toLocaleDateString("en-GB")}
      </Cell>
      <Cell fontSize={fontSize}>{contactDescription}</Cell>
      <Cell fontSize={fontSize}>{contractPrice}</Cell>
      <Cell>
        <DeleteAlertDialog
          isPending={isPending}
          onConfirm={handleDelete}
          resourceName={t("title")}
        />

        {/* <Button
          _focus={{ outline: "none", "box-shadow": "none" }}
          isLoading={isPending}
          _hover={{ backgroundColor: "teal.500", color: "white" }}
          onClick={handleDelete}
          fontSize={"xl"}
          padding={"0.5rem 3rem 0.5rem 3rem"}
        >
          {t("delete")}
        </Button> */}
      </Cell>
    </CustomTable.Row>
  );
}

export default ServiceRenewHistoryRow;
