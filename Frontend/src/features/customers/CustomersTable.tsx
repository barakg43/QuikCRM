import { useTranslation } from "react-i18next";
import CustomTable from "../../components/CustomTable";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomerRow from "./CustomerRow";
import { useCustomers } from "./hooks/useCustomers";
import Pagination from "../../components/Pagination";
import { Td, Th } from "@chakra-ui/react";
// eslint-disable-next-line react-refresh/only-export-components
export const customerStatuses = [
  "IN_SERVICE",
  "OUT_OF_SERVICE",
  "BANK_HOURS",
  "CLOUD_SERVER",
  "CLOUD_MAIL",
  "CHARGE",
] as const;

function HeaderCell({ label }: { label: string }) {
  return (
    <Td border='none' as={"th"} textAlign='center'>
      {label}
    </Td>
  );
}
function CustomersTable() {
  const { customers, isLoading, totalItems } = useCustomers();
  const { t } = useTranslation("customers", { keyPrefix: "table" });
  return (
    <CustomTable columns={"1fr ".repeat(5)}>
      <CustomTable.Header>
        <HeaderCell label={t("customerId")} />
        <HeaderCell label={t("customerName")} />
        <HeaderCell label={t("address")} />
        <HeaderCell label={t("city")} />
        <HeaderCell label={t("status")} />
      </CustomTable.Header>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <CustomTable.Body
          data={customers}
          isLoading={isLoading}
          render={(customer) => (
            <CustomerRow
              customerID={customer.customerID}
              customerShortName={customer.customerShortName}
              address={customer.address}
              city={customer.city}
              customerStatus={customer.customerStatus}
              key={customer.customerID}
            />
          )}
        />
      )}
      <CustomTable.Footer>
        <Pagination totalItemsAmount={totalItems} />
      </CustomTable.Footer>
    </CustomTable>
  );
}

export default CustomersTable;
