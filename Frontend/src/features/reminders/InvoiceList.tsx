import styled from "styled-components";
import RenewContactReminder from "../service-renews/RenewContactReminder";
const StyledInvoiceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;
const test = {
  ContractID: 15,
  CustomerID: 38,
  StartDateOfContract: new Date(),
  ContractPrice: 170,
  FinishDateOfContract: new Date("2/26/2024"),
  ReminderDate: new Date(),
  ContactDescription: " חידוש",
  PeriodKind: "רבעון",
  customerShortName: "אברהם",
};
function InvoiceList() {
  return (
    <StyledInvoiceList>
      <RenewContactReminder {...test} />
    </StyledInvoiceList>
  );
}

export default InvoiceList;
