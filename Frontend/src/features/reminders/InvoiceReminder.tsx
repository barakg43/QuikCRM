/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Heading from "../../components/Heading";
import Row from "../../components/Row";
import StyledSelect from "../../components/StyledSelect";
import { Button } from "@chakra-ui/react";

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

const Date = styled.span`
  font-size: var(--scale-0000);
`;

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
  ContractID,
  DateOfDebit,
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
          <Button size='small' onClick={renewReminder}>
            {t("renew")}
          </Button>
        </Row>
      </Row>
    </StyledInvoiceReminder>
  );
}

export default InvoiceReminder;
