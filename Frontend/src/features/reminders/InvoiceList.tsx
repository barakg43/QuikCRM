import styled from "styled-components";
import database from "./../../../data/database.json";
import InvoiceReminder from "./InvoiceReminder";
const StyledInvoiceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;
const invoices = database["invoices"];
function InvoiceList() {
  return (
    <StyledInvoiceList>
      {invoices.map((invoice) => (
        <InvoiceReminder {...invoice} key={invoice.ContractID} />
      ))}
    </StyledInvoiceList>
  );
}

export default InvoiceList;
