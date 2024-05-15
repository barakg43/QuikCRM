import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import CustomTable from "../../../../../components/CustomTable.tsx";
import LoadingSpinner from "../../../../../components/LoadingSpinner.tsx";
import AddEditServiceContractModal from "../../../../service-renews/AddEditServiceContractModal";
import { useServiceContractRenews } from "../../../../service-renews/hooks/useServiceContractRenews.ts";
import { ServiceRenewRecord } from "../../../../service-renews/serviceRenews";
import ServiceRenewHistoryRow from "./ServiceRenewHistoryRow.tsx";
function ServiceRenewsHistoryTable() {
  const { serviceContractRenews, isLoading } = useServiceContractRenews();
  const { t } = useTranslation("serviceRenews", { keyPrefix: "renew-table" });
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        alignContent='center'
        justifyContent='flex-end'
        paddingBottom='10px'
        w='95%'
      >
        <AddEditServiceContractModal serviceRenewToEdit={{}} />
      </Flex>
      <CustomTable columns={"1fr ".repeat(6)}>
        <CustomTable.Header>
          <CustomTable.Header.Cell label={t("contractID")} />
          <CustomTable.Header.Cell label={t("startDateOfContract")} />
          <CustomTable.Header.Cell label={t("finishDateOfContract")} />
          <CustomTable.Header.Cell label={t("contactDescription")} />
          <CustomTable.Header.Cell label={t("contractPrice")} />
        </CustomTable.Header>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <CustomTable.Body
            data={serviceContractRenews}
            isLoading={isLoading}
            resourceName={t("title")}
            render={(serviceReminder: ServiceRenewRecord) => (
              <ServiceRenewHistoryRow
                contractID={serviceReminder.contractID}
                startDateOfContract={serviceReminder.startDateOfContract}
                finishDateOfContract={serviceReminder.finishDateOfContract}
                contractPrice={serviceReminder.contractPrice}
                contactDescription={serviceReminder.contactDescription}
                key={serviceReminder.contractID}
              />
            )}
          />
        )}
        <CustomTable.Footer>
          <Box as='td'>{""}</Box>
          {/* <Pagination totalItemsAmount={totalItems} /> */}
        </CustomTable.Footer>
      </CustomTable>
    </>
  );
}

export default ServiceRenewsHistoryTable;
