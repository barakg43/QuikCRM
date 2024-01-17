import styled from "styled-components";
import InvoiceList from "./InvoiceList";
import { useReminders } from "./hooks/useReminders";
import LoadingSpinner from "../../components/LoadingSpinner";

const StyledRemindersTable = styled.div``;

function RemindersTable() {
  const { reminders, isLoading } = useReminders();
  if (isLoading) return <LoadingSpinner />;
  return (
    <StyledRemindersTable>
      <InvoiceList />
    </StyledRemindersTable>
  );
}

export default RemindersTable;
