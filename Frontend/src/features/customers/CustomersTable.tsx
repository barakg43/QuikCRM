import { useTranslation } from "react-i18next";
import CustomTable from "../../components/CustomTable";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomerRow from "./CustomerRow";
import { useCustomers } from "./hooks/useCustomers";
import Pagination from "../../components/Pagination";
import { TableHeaderCell } from "../../components/TableHeaderCell";
// eslint-disable-next-line react-refresh/only-export-components
export const customerStatuses = [
  "IN_SERVICE",
  "OUT_OF_SERVICE",
  "BANK_HOURS",
  "CLOUD_SERVER",
  "CLOUD_MAIL",
  "CHARGE",
] as const;

function CustomersTable() {
  const { customers, isLoading, totalItems } = useCustomers();
  const { t } = useTranslation("customers", { keyPrefix: "table" });
  return (
    <CustomTable columns={"1fr ".repeat(5)}>
      <CustomTable.Header>
        <TableHeaderCell label={t("customerId")} />
        <TableHeaderCell label={t("customerName")} />
        <TableHeaderCell label={t("address")} />
        <TableHeaderCell label={t("city")} />
        <TableHeaderCell label={t("status")} />
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
