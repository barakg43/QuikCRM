import CustomTable from "../../../../../components/CustomTable";
import LoadingSpinner from "../../../../../components/LoadingSpinner";
import TableHeaderCell from "../../../../../components/TableHeaderCell";

function ServiceRenewCustomer() {
  const isLoading = false;
  const serviceRenews = {};
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

export default ServiceRenewCustomer;
