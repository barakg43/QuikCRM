import {
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { UseMutateFunction } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import DeleteAlertDialog from "../../../components/DeleteAlertDialog";
import { DetailRow } from "../../../components/DetailRow";
import LoadingSpinner from "../../../components/LoadingSpinner";
import StatusTag from "../../../components/StatusTag";
import { CustomerFullDataType } from "../customers";
import CustomerFormModal from "./CustomerFormModal";
import ChildTabs from "./child/ChildTabs";
import { useCustomer } from "./hooks/useCustomer";
import { useDeleteCustomer } from "./hooks/useDeleteCustomer";
export default CustomerDetails;

function CustomerDetails() {
  const { customerId } = useParams();
  // console.log("customerId", customerId);\
  const toast = useToast();

  const { customer, isLoading, error } = useCustomer(Number(customerId));
  const {
    customerID,
    customerShortName,
    customerStatus,
    customerName,
    customerIdentificationNumber,
    customerMainPhone,
    customerMainEMail,
    remarks,
    address,
    city,
    postalCode,
    addressRemarks,
    contactPersonName,
    contactPersonMobilePhone,
  } = customer;
  const navigate = useNavigate();
  if (error) {
    console.error("Error customer", error);

    toast({
      title: "Error occurred",
      description: "there are error fetch",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    navigate(-1);
  }

  const { deleteCustomer, isPending: isDeleting } = useDeleteCustomer();
  if (isLoading || isDeleting)
    return <LoadingSpinner callerName='CustomerDetails' />;

  return (
    <Grid
      gridTemplateAreas={`"header header header"
                          "general general general"
                        "address contact notes"
                        "child child child"`}
      width='90%'
      height='89dvh'
      templateRows='0.5fr 0.5fr 4fr 7fr'
      templateColumns='1fr 1fr 2.5fr'
      gap={2}
    >
      <General
        customerStatus={customerStatus}
        customerName={customerName}
        customerIdentificationNumber={customerIdentificationNumber}
      />

      <Address
        address={address}
        city={city}
        postalCode={postalCode}
        addressRemarks={addressRemarks}
      />
      <Notes remakes={remarks} />

      <Contact
        contactPersonMobilePhone={contactPersonMobilePhone}
        customerMainEMail={customerMainEMail}
        contactPersonName={contactPersonName}
        customerMainPhone={customerMainPhone}
      />
      <Child />
      <Header
        customerData={customer}
        customerID={customerID}
        customerShortName={customerShortName}
        deleteCustomerApi={deleteCustomer}
      />
    </Grid>
  );
}

function Header({
  customerID,
  customerShortName,
  customerData,
  deleteCustomerApi,
}: {
  customerID: number;
  customerShortName: string | undefined;
  customerData: CustomerFullDataType | Record<string, never>;
  deleteCustomerApi: UseMutateFunction<void, Error, number, unknown>;
}) {
  const { t } = useTranslation("components", { keyPrefix: "buttons" });
  const navigate = useNavigate();

  // function t(key: string) {
  //   return key;
  // }
  function handleDelete() {
    deleteCustomerApi(customerID, { onSuccess: () => navigate("/customers") });
  }

  return (
    <GridItem
      // bg='green'
      area='header'
      borderTopEndRadius='5px'
      padding={3}
      alignItems='center'
    >
      <Flex
        flexDirection='row'
        justifyContent='space-between'
        gap={2}
        alignItems='center'
      >
        <Text fontSize='4xl' fontWeight={600}>
          {customerID} - {customerShortName}
        </Text>

        <HStack>
          <DeleteAlertDialog
            onConfirm={handleDelete}
            resourceName={t("title")}
          />
          <CustomerFormModal customerToEdit={customerData} />
        </HStack>
      </Flex>
    </GridItem>
  );
}
type HeaderProps = {
  customerStatus: string;
  customerName: string | undefined;
  customerIdentificationNumber: string | undefined;
};
function General({
  customerStatus,
  customerName,
  customerIdentificationNumber,
}: HeaderProps) {
  const { t } = useTranslation("customers", { keyPrefix: "details" });

  return (
    <GridItem
      area='general'
      borderTopRadius='8px'
      padding={2}
      textAlign='center'
      bgColor='teal'
    >
      <Flex
        flexDirection='row'
        gap='2rem'
        justifyContent='space-around'
        height='100%'
        alignItems='center'
      >
        <DetailRow
          label={t("customerName")}
          value={customerName}
          useDivider={false}
        />
        <Divider orientation='vertical' colorScheme='red' size='3rem' />
        <DetailRow
          label={t("customerIdentificationNumber")}
          value={customerIdentificationNumber}
          useDivider={false}
        />

        <Divider orientation='vertical' colorScheme='red' size='3rem' />
        <StatusTag status={customerStatus} />
      </Flex>
    </GridItem>
  );
}
type AddressProps = {
  address: string | undefined;
  city: string | undefined;
  postalCode: string | undefined;
  addressRemarks: string | undefined;
};
function Address({ address, city, postalCode, addressRemarks }: AddressProps) {
  const { t } = useTranslation("customers", { keyPrefix: "details" });
  return (
    <GridItem bg='pink' area='address' padding='1rem'>
      <Flex
        flexDirection='column'
        gap={2}
        height='100%'
        width='100%'
        alignItems='start'
      >
        <DetailRow label={t("address")} value={address} />
        <DetailRow label={t("city")} value={city} />
        <DetailRow label={t("postalCode")} value={postalCode} />

        <Text>
          {t("addressRemarks")}: <br /> {addressRemarks}
        </Text>
      </Flex>
    </GridItem>
  );
}
function Notes({ remakes }: { remakes: string | undefined }) {
  const { t } = useTranslation("customers", { keyPrefix: "details" });

  return (
    <GridItem bg='blue' area='notes' gap={3} padding='1rem'>
      <Flex>
        {t("remarks")} <br /> {remakes}
      </Flex>
    </GridItem>
  );
}
type ContactProps = {
  customerMainPhone: string | undefined;
  customerMainEMail: string | undefined;
  contactPersonName: string | undefined;
  contactPersonMobilePhone: string | undefined;
};
function Contact({
  customerMainPhone,
  customerMainEMail,
  contactPersonName,
  contactPersonMobilePhone,
}: ContactProps) {
  const { t } = useTranslation("customers", { keyPrefix: "details" });

  return (
    <GridItem bg='brown' area='contact' padding='1rem'>
      <Flex
        flexDirection='column'
        gap={2}
        height='100%'
        width='100%'
        alignItems='start'
      >
        <DetailRow label={t("customerMainPhone")} value={customerMainPhone} />
        <DetailRow label={t("customerMainEMail")} value={customerMainEMail} />
        <DetailRow label={t("contactPersonName")} value={contactPersonName} />
        <DetailRow
          label={t("contactPersonMobilePhone")}
          value={contactPersonMobilePhone}
          useDivider={false}
        />
      </Flex>
    </GridItem>
  );
}
function Child() {
  return (
    <GridItem bg='red' area='child' padding='1rem'>
      <ChildTabs />
    </GridItem>
  );
}
