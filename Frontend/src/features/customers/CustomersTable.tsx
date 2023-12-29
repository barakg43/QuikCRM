import { useTranslation } from "react-i18next";
import LoadingSpinner from "../../components/LoadingSpinner";
import Table from "../../components/Table";
import CustomerRow from "./CustomerRow";
import { useCustomers } from "./hooks/useCustomers";
import Pagination from "../../components/Pagination";

export const customerStatuses = [
  "in-service",
  "out-of-service",
  "bank-hours",
  "cloud-server",
  "cloud-mail",
  "charge",
] as const;

function CustomersTable() {
  const { customers, isLoading, totalItems, error } = useCustomers();
  const { t } = useTranslation("customers", { keyPrefix: "table" });
  if (isLoading) return <LoadingSpinner />;
  return (
    <Table columns={"1fr ".repeat(5)}>
      <Table.Header>
        <span>{t("customerId")}</span>
        <span>{t("customerName")}</span>
        <span>{t("address")}</span>
        <span>{t("city")}</span>
        <span>{t("status")}</span>
      </Table.Header>
      <Table.Body
        data={customers}
        render={(customer) => (
          <CustomerRow
            customerID={customer.customerID}
            customerName={customer.customerShortName}
            address={customer.address}
            city={customer.city}
            status={customer.customerStatus}
            key={customer.customerID}
          />
        )}
      />
      <Table.Footer>
        <Pagination totalItemsAmount={totalItems} />
      </Table.Footer>
    </Table>
  );
}

export default CustomersTable;
