import { useTranslation } from "react-i18next";
import LoadingSpinner from "../../components/LoadingSpinner";
import Table from "../../components/CustomTable";
import CustomerRow from "./CustomerRow";
import { useCustomers } from "./hooks/useCustomers";
import { useToast } from "@chakra-ui/react";
export const customerStatuses = [
  "in-service",
  "out-of-service",
  "bank-hours",
  "cloud-server",
  "cloud-mail",
  "charge",
] as const;

function CustomersTable() {
  const { customers, isLoading, totalItems } = useCustomers();
  const { t } = useTranslation("customers", { keyPrefix: "table" });

  return (
    <Table columns={"1fr ".repeat(5)} minHeight='100%' minWeight='100%'>
      <Table.Header>
        <span>{t("customerId")}</span>
        <span>{t("customerName")}</span>
        <span>{t("address")}</span>
        <span>{t("city")}</span>
        <span>{t("status")}</span>
      </Table.Header>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Table.Body
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
      <Table.Footer>
        {/* <Pagination totalItemsAmount={totalItems} /> */}
      </Table.Footer>
    </Table>
  );
}

export default CustomersTable;
