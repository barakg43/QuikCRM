import { useTranslation } from "react-i18next";
import { useServiceContractRenews } from "./hooks/useServiceContractRenews";
import { Flex } from "@chakra-ui/react";
import CustomTable from "./../../components/CustomTable.tsx";
import TableHeaderCell from "../../components/TableHeaderCell";
import LoadingSpinner from "../../components/LoadingSpinner";
import ServiceRenewRow from "./ServiceRenewRow.tsx";
import ServiceRenewFormModal from "./ServiceRenewFormModal.tsx";
function ServiceRenewsTable() {
  // return null;
  const { serviceContractRenews, isLoading } = useServiceContractRenews();
  const { t } = useTranslation("serviceRenews", { keyPrefix: "renew-table" });
  console.log("serviceContractRenews", serviceContractRenews);
  return (
    <>
      <Flex
        alignContent='center'
        justifyContent='flex-end'
        paddingBottom='10px'
        w='95%'
      >
        {/* <CustomerFormModal /> */}
      </Flex>
      <CustomTable columns={"1fr ".repeat(5)}>
        <CustomTable.Header>
          <TableHeaderCell label={t("customerShortName")} />
          <TableHeaderCell label={t("startDateOfContract")} />
          <TableHeaderCell label={t("finishDateOfContract")} />
          <TableHeaderCell label={t("periodKind")} />
        </CustomTable.Header>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <CustomTable.Body
            data={serviceContractRenews}
            isLoading={isLoading}
            resourceName='title'
            render={(serviceReminder) => (
              <ServiceRenewRow
                customerID={serviceReminder.customerID}
                customerShortName={serviceReminder.customerShortName}
                contractID={serviceReminder.contractID}
                startDateOfContract={serviceReminder.startDateOfContract}
                finishDateOfContract={serviceReminder.finishDateOfContract}
                contractPrice={serviceReminder.contractPrice}
                periodKind={serviceReminder.periodKind}
                contactDescription={serviceReminder.contactDescription}
                key={serviceReminder.contractID}
              />
            )}
          />
        )}
        <CustomTable.Footer>
          {""}
          {/* <Pagination totalItemsAmount={totalItems} /> */}
        </CustomTable.Footer>
      </CustomTable>
    </>
  );
}

export default ServiceRenewsTable;
