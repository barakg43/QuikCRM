import { Box, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useParams } from "react-router-dom";
import CustomTable from "../../../../../components/CustomTable.tsx";
import { useServiceContractRenews } from "../../../../service-renews/hooks/useServiceContractRenews.ts";
import { ServiceRenewRecord } from "../../../../service-renews/serviceRenews";
import { useCustomer } from "../../hooks/useCustomer.ts";
import AddEditServiceContractModal from "./AddEditServiceContractModal.tsx";
import ServiceRenewHistoryRow from "./ServiceRenewHistoryRow.tsx";
function ServiceRenewsHistoryTable() {
  const { serviceContractRenews, isLoading: isLoadingHistory } =
    useServiceContractRenews();
  const { t } = useTranslation("serviceRenews", { keyPrefix: "renew-table" });
  const { customerId } = useParams();
  // console.log("customerId", customerId);\

  const {
    customer: { activeContractID },
    isLoading: isLoadingCustomer,
  } = useCustomer(Number(customerId));
  const isLoading = isLoadingCustomer || isLoadingHistory;
  return (
    <>
      <Flex
        alignContent='center'
        justifyContent='flex-end'
        paddingBottom='10px'
        w='95%'
      >
        <AddEditServiceContractModal />
      </Flex>
      <CustomTable columns={"1fr ".repeat(6)}>
        <CustomTable.Header>
          <CustomTable.Header.Cell label={t("contractID")} />
          <CustomTable.Header.Cell label={t("startDateOfContract")} />
          <CustomTable.Header.Cell label={t("finishDateOfContract")} />
          <CustomTable.Header.Cell label={t("contactDescription")} />
          <CustomTable.Header.Cell label={t("contractPrice")} />
        </CustomTable.Header>

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
              periodKind={serviceReminder.periodKind}
              isActiveContract={serviceReminder.contractID === activeContractID}
              key={serviceReminder.contractID}
            />
          )}
        />

        <CustomTable.Footer>
          <Box as='td'>{""}</Box>
          {/* <Pagination totalItemsAmount={totalItems} /> */}
        </CustomTable.Footer>
      </CustomTable>
    </>
  );
}

export default ServiceRenewsHistoryTable;
