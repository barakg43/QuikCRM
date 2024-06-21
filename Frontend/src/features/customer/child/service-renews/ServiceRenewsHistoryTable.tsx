import { Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import CustomTable from "../../../../components/CustomTable.tsx";
import Pagination from "../../../../components/Pagination.tsx";
import { useServiceContractHistoryCustomer } from "../../../service-renews/hooks/useServiceContractHistoryCustomer.ts";
import { ServiceRenewRecord } from "../../../service-renews/serviceRenews";
import { useCustomer } from "../../hooks/useCustomer.ts";
import { useCustomerIdParam } from "../../hooks/useCustomerIdParam.ts";
import AddEditServiceContractModal from "./AddEditServiceContractModal.tsx";
import ServiceRenewHistoryRow from "./ServiceRenewHistoryRow.tsx";
function ServiceRenewsHistoryTable() {
  const customerId = useCustomerIdParam();

  const {
    serviceContractRenews,
    isLoading: isLoadingHistory,
    totalItems,
  } = useServiceContractHistoryCustomer(customerId);
  const { t } = useTranslation("serviceRenews");

  const {
    customer: { activeContractID },
    isLoading: isLoadingCustomer,
  } = useCustomer(customerId);
  const isLoading = isLoadingCustomer || isLoadingHistory;
  return (
    <>
      {!activeContractID && (
        <Flex
          alignContent='center'
          justifyContent='flex-end'
          paddingBottom='10px'
          w='95%'
        >
          <AddEditServiceContractModal />
        </Flex>
      )}
      <CustomTable columns={"0.5fr 1fr 1fr 5fr 1fr"}>
        <CustomTable.Header>
          <CustomTable.Header.Cell label={t("contractID")} />
          <CustomTable.Header.Cell label={t("startDateOfContract")} />
          <CustomTable.Header.Cell label={t("finishDateOfContract")} />
          <CustomTable.Header.Cell label={t("contractDescription")} />
          <CustomTable.Header.Cell label={t("contractPrice")} />
        </CustomTable.Header>

        <CustomTable.Body
          data={serviceContractRenews}
          isLoading={isLoading}
          resourceName={t("title")}
          render={(serviceReminder: ServiceRenewRecord) => (
            <ServiceRenewHistoryRow
              serviceReminder={serviceReminder}
              isActiveContract={serviceReminder.contractID === activeContractID}
              key={serviceReminder.contractID}
            />
          )}
        />

        <CustomTable.Footer>
          <Pagination totalItemsAmount={totalItems} />
        </CustomTable.Footer>
      </CustomTable>
    </>
  );
}

export default ServiceRenewsHistoryTable;
