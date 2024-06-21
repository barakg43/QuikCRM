import { Flex, Text, Tooltip } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import CustomTable from "../../../../components/CustomTable";
import DeleteAlertDialog from "../../../../components/DeleteAlertDialog";
import { useDeleteServiceContract } from "../../../service-renews/hooks/useDeleteServiceContract";
import { ServiceRenewRecord } from "../../../service-renews/serviceRenews";
import AddEditServiceContractModal from "./AddEditServiceContractModal";

interface ServiceRenewHistoryProps {
  serviceReminder: ServiceRenewRecord;
  isActiveContract?: boolean | undefined;
}
function ServiceRenewHistoryRow({
  serviceReminder,
  isActiveContract = false,
}: ServiceRenewHistoryProps) {
  const { t } = useTranslation("serviceRenews");
  const { deleteServiceContract, isPending } = useDeleteServiceContract();
  const fontSize = "small";
  const Cell = CustomTable.Row.Cell;
  const {
    contractID,
    contractDescription,
    finishDateOfContract,
    startDateOfContract,
    contractPrice,
  } = serviceReminder;
  function handleDelete() {
    deleteServiceContract(contractID || -1);
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
      <Cell fontSize={fontSize} sx={{ w: "60.5%" }}>
        <Tooltip label={contractDescription} fontSize='lg'>
          <Text
            wordBreak='break-word'
            whiteSpace='normal'
            overflow='hidden'
            noOfLines={2}
            textOverflow='ellipsis'
          >
            {contractDescription}
          </Text>
        </Tooltip>
      </Cell>
      <Cell fontSize={fontSize}>{contractPrice}</Cell>
      <Cell>
        {isActiveContract && (
          <Flex
            alignContent='center'
            justifyContent='flex-end'
            paddingBottom='10px'
            gap='1rem'
            w='95%'
          >
            <DeleteAlertDialog
              isPending={isPending}
              onConfirm={handleDelete}
              resourceName={t("title")}
            />

            <AddEditServiceContractModal serviceRenewToEdit={serviceReminder} />
          </Flex>
        )}
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
