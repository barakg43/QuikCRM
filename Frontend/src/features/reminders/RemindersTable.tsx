import styled from "styled-components";
import InvoiceList from "./InvoiceList";
import { useReminders } from "./hooks/useReminders";
import LoadingSpinner from "../../components/LoadingSpinner";

const StyledRemindersTable = styled.div``;
const test = {
  ContractID: 15,
  CustomerID: 38,
  StartDateOfContract: Date.now(),
  ContractPrice: 170,
  FinishDateOfContract: Date.now(),
  ReminderDate: Date.now(),
  ContactDescription: " חידוש",
  PeriodKind: "רבעון",
  customerShortName: "אברהם",
};
function RemindersTable() {
  // const { reminders, isLoading } = useReminders();
  // if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      <InvoiceList />
    </div>
  );
}

export default RemindersTable;
