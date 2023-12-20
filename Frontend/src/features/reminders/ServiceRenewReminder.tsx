import styled from "styled-components";
import Heading from "../../components/Heading";

// {
//   "dateOfReminder": "2023-11-16",
//   "timeOfReminder": null,
//   "reminderID": "713",
//   "reminderRemark": "שחר-און שירותי ניהול בע\"מ: חוזה שירות-תאריך סיום-31/12/23",
//   "responsibleUserName": "dbo",
//   "closed": 0
// }
const StyledReminderComponent = styled.div`
  display: flex;
`;

function ReminderComponent() {
  return (
    <StyledReminderComponent>
      <Heading as='h3'></Heading>
    </StyledReminderComponent>
  );
}

export default ReminderComponent;
