import styled from "styled-components";
import Heading from "../../components/Heading";
import { ContactProps } from "./reminder";
import { Card } from "@chakra-ui/react";

export type RenewContactProps = {
  ContractID: number;
  CustomerID: number;
  customerShortName: string;
  ContractPrice: number;
  StartDateOfContract: Date;
  FinishDateOfContract: Date;
  ReminderDate: Date;
  ContactDescription: string;
  PeriodKind: string;
};
function RenewContactReminder({
  ContractID,
  CustomerID,
  FinishDateOfContract,
  StartDateOfContract,
  ContactDescription,
  ReminderDate,
  ContractPrice,
  customerShortName,
  PeriodKind,
}: RenewContactProps) {
  return (
    <Card>
      <Heading as='h3'></Heading>
    </Card>
  );
}

export default RenewContactReminder;
