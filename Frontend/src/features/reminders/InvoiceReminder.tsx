import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import Row from "../../components/Row";
import StyledSelect from "../../components/StyledSelect";

const StyledInvoiceReminder = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 0;
  box-sizing: border-box;
  gap: 1rem;
  font-size: var(--scale-000);
  border: 1px var(--color-primary-600) solid;
  border-radius: var(--radius-sm);
  justify-content: space-between;
  padding: 0.1rem var(--scale-1);
  /* margin: 4px; */
  &:hover {
    border: 2px var(--color-primary-950) solid;
    width: calc(100% - 1px);
    height: calc(100% - 10px);
  }

  &:hover button {
    opacity: 1;
  }
  & button {
    /* padding: 10px; */
    /* max-height: max-content; */
    opacity: 0.5;
  }
`;

const H3 = styled.h3`
  font-size: var(--scale-000);
  margin-inline-start: var(--scale-000);
`;

const Date = styled.span`
  font-size: var(--scale-0000);
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
  reminderRemark?: number;
  Renewal: number;
};

function InvoiceReminder({
  CustName,
  InvoiceNum,
  ContractID,
  reminderRemark,
  DateOfDebit,
  Renewal,
}: InvoiceReminderProps) {
  const { t } = useTranslation("reminders", { keyPrefix: "invoice" });
  const dateString = `${t("dateOfDebit")} : ${DateOfDebit}`;
  const [renewPeriod, setRenewPeriod] = useState(12);
  const renewOptions = [
    {
      label: t("month"),
      value: 1,
    },
    {
      label: t("quarter"),
      value: 3,
    },
    {
      label: t("year"),
      value: 12,
    },
  ];
  function handleOnChangeRenewPeriod(e: React.ChangeEvent<HTMLSelectElement>) {
    setRenewPeriod(+e.target.value);
  }
  function renewReminder() {}
  return (
    <StyledInvoiceReminder>
      <Row>
        <Row type='horizontal' gap={0.5}>
          <span>{ContractID}</span>
          <Heading as='h3'>{CustName}</Heading>
        </Row>
        <Row type='horizontal' gap={0.7}>
          <Date>{dateString}</Date>
          <StyledSelect
            options={renewOptions}
            value={renewPeriod}
            onChange={handleOnChangeRenewPeriod}
          />
          <Button size='small' variation='secondary' onClick={renewReminder}>
            {t("renew")}
          </Button>
        </Row>
      </Row>
    </StyledInvoiceReminder>
  );
}

export default InvoiceReminder;
