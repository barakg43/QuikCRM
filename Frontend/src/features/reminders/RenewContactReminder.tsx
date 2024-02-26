import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  HStack,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
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
    <Card>
      {/* _hover={{ backgroundColor: "teal.100" }}*/}
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
        <RenewPanel />
      </CardFooter>
    </Card>
  );
}

function RenewPanel() {
  const [period, setPeriod] = useState("1");
  const { t } = useTranslation("reminders", { keyPrefix: "serviceRenew" });
  return (
    <Flex grow={1} gap={6} fontSize='2xl'>
      <Text>renew for:</Text>
      <RadioGroup onChange={setPeriod} value={period} w={"50%"}>
        <Stack direction='row'>
          <Radio size='xl' value={"1"}>
            {t("month")}
          </Radio>
          <Radio size='xl' value={"3"}>
            {t("quarter")}
          </Radio>
          <Radio size='xl' value={"12"}>
            {t("year")}
          </Radio>
        </Stack>
      </RadioGroup>
      <Button>Renew</Button>
    </Flex>
  );
}

export default RenewContactReminder;
