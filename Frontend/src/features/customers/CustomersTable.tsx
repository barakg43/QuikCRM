import Table from "../../components/Table";
import { useCustomers } from "./useCustomers";
import CustomerRow from "./CustomerRow";

const CustomerStatuses = [
  "in-service",
  "out-of-service",
  "bank-hours",
  "cloud-server",
  "cloud-mail",
  "charge",
];

function CustomersTable() {
  const { customers, isLoading, error } = useCustomers();

  return (
    <Table columns={"1fr ".repeat(5)}>
      <Table.Header>
        <span>Customer Id</span>
        <span>Customer Name</span>
        <span>Address</span>
        <span>city</span>
        <span>Status</span>
      </Table.Header>
      <Table.Body
        data={customers}
        render={(customer) => (
          <CustomerRow
            customerID={customer.customerID}
            customerName={customer.customerShortName}
            address={customer.address}
            city={customer.city}
            status={customer.status}
          />
        )}
      />
    </Table>
  );
}

export default CustomersTable;
