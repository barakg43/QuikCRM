import styled from "styled-components";

const StyledInvoiceReminder = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  font-size: var(--scale-00);
  border: 1px var(--color-emerald-950) solid;
  border-radius: var(--radius-sm);
  justify-content: center;
  padding: 0.1rem var(--scale-1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const H3 = styled.h3`
  font-size: var(--scale-1);
`;

const Date = styled.span`
  font-size: var(--scale-000);
`;
const ContractID = styled.span``;
// {
//     "CustName": null,
//     "InvoiceNum": null,
//     "ContractID": "631",
//     "DateOfDebit": "2023-12-17",
//     "Renewal": 0
//   },

type InvoiceReminderProps = {
  CustName: string | null;
  InvoiceNum: string | null;
  ContractID: string;
  DateOfDebit: string;
  Renewal: number;
};

function InvoiceReminder({
  CustName,
  InvoiceNum,
  ContractID,
  DateOfDebit,
  Renewal,
}: InvoiceReminderProps) {
  return (
    <StyledInvoiceReminder>
      <Header>
        <span>{ContractID}</span>
        <H3>{CustName}</H3>
        <Date>{DateOfDebit}</Date>
      </Header>
    </StyledInvoiceReminder>
  );
}

export default InvoiceReminder;
