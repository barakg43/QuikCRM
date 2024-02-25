import { useTranslation } from "react-i18next";
import CustomTable from "../../components/CustomTable";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomerRow from "./CustomerRow";
import { useCustomers } from "./hooks/useCustomers";
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
  console.log(totalItems);
  return (
    <CustomTable columns={"1fr ".repeat(5)}>
      <CustomTable.Header>
        <span>{t("customerId")}</span>
        <span>{t("customerName")}</span>
        <span>{t("address")}</span>
        <span>{t("city")}</span>
        <span>{t("status")}</span>
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
        {/* <Pagination totalItemsAmount={totalItems} /> */}
      </CustomTable.Footer>
    </CustomTable>
  );
}

export default CustomersTable;
