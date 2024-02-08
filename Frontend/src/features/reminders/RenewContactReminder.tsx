import styled from "styled-components";
import { Heading, Stack, StackDivider } from "@chakra-ui/react";
import { ContactProps } from "./reminder";
import { Option } from "../../components/StyledSelect";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  Text,
  chakra,
} from "@chakra-ui/react";
import { DetailRow } from "../../components/DetailRow";

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
    <Card _hover={{ backgroundColor: "teal.100" }}>
      <CardHeader>
        <Heading as='h4' fontSize='x-large' fontFamily='inherit'>
          {ContractID} | {CustomerID}- {customerShortName}
        </Heading>
      </CardHeader>
      <CardBody
      // w={"max-content"}
      // display='flex'
      // flexDirection='column'
      // gap='1rem'
      >
        <Stack divider={<StackDivider />} spacing='3'>
          <HStack divider={<StackDivider />}>
            <DetailRow
              label={"StartDate"}
              value={StartDateOfContract.toLocaleDateString()}
            />
            <DetailRow
              label={"endDate"}
              value={FinishDateOfContract.toLocaleDateString()}
            />
            <DetailRow label={"PeriodKind"} value={PeriodKind} />
          </HStack>
          <HStack>
            <DetailRow
              label={"ReminderDate"}
              value={ReminderDate.toLocaleDateString()}
            />
            <DetailRow label={"ContractPrice"} value={ContractPrice} />
          </HStack>
          <DetailRow label={"ContactDescription"} value={ContactDescription} />
        </Stack>
      </CardBody>
      <CardFooter>
        <Button>Renew</Button>
      </CardFooter>
    </Card>
  );
}

export default RenewContactReminder;
