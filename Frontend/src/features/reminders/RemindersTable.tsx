import styled from "styled-components";
import { getAllReminders } from "../../services/apiReminders";
import { useReminders } from "./useReminders";
import InvoiceList from "./InvoiceList";

const StyledRemindersTable = styled.div``;

function RemindersTable() {
  const { reminders, isLoading } = useReminders();
  console.log(reminders);

  return (
    <StyledRemindersTable>
      <InvoiceList />
    </StyledRemindersTable>
  );
}

export default RemindersTable;
