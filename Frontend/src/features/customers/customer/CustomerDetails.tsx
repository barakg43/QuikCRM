import { useState } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useCustomer } from "./useCustomer";
import {
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Tag,
  Text,
  Textarea,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import StatusTag from "../../../components/StatusTag";
import { useTranslation } from "react-i18next";
import { customerStatuses } from "../CustomersTable";
import CustomerFormModal from "./CustomerFormModal";
import { CustomerFullDataType } from "../customers";
export default CustomerDetails;

const test = {
  customerID: 129,
  activeContractID: 564,
  customerShortName: "אנגל דבלופרס                                      ",
  customerName: "אנגל ג'נרל דיבלופרס בע\"מ",
  customerStatus: "bank-hours                                        ",
  customerIdentificationNumber: null,
  customerMainPhone: "03-7655000",
  customerMainFax: null,
  customerMainEMail: null,
  customerWebSite: null,
  remarks: null,
  address: "קרמניצקי 2",
  city: "תל אביב                                           ",
  postalCode: null,
  addressRemarks: null,
  contactPersonName: "שלי                           ",
  contactPersonPost: null,
  contactPersonPhone: "03-7655000",
  contactPersonMobilePhone: null,
  contactPersonFax: null,
  contactPersonEMail: null,
};

function CustomerDetails() {
  const { customerId } = useParams();
  // console.log("customerId", customerId);
  const {
    customer: {
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
    } = {},
    isLoading,
  } = useCustomer(Number(customerId));

  const [isEditing, setIsEditing] = useState(false);
  if (isLoading) return <LoadingSpinner />;

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
      <Header customerID={customerID} customerShortName={customerShortName} />
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
    </Grid>
  );
}

function Header({
  customerID,
  customerShortName,
}: {
  customerID: number | undefined;
  customerShortName: string | undefined;
}) {
  const { t } = useTranslation("components", { keyPrefix: "buttons" });

  return (
    <>
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
            <Button colorScheme='red'>{t("delete")}</Button> */
            <CustomerFormModal />
          </HStack>
        </Flex>
      </GridItem>
    </>
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
  console.log("customerStatus", customerStatus);
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
        gap={2}
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
        {/* 
          <Divider orientation='vertical' colorScheme='red' size='3rem' /><StatusTag status={customerStatus} /> */}
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
        {/* <Text>customerMainPhone {customerMainPhone}</Text>
        <Text>customerMainEMail {customerMainEMail}</Text>
        <Text>contactPersonName {contactPersonName}</Text>
        <Text>contactPersonMobilePhone {contactPersonMobilePhone}</Text> */}
      </Flex>
    </GridItem>
  );
}
function Child() {
  return (
    <GridItem bg='red' area='child' padding='1rem'>
      <Flex>
        <Button colorScheme='teal'>Edit</Button>
      </Flex>
    </GridItem>
  );
}
function DetailRow<T>({
  label,
  value,
  useDivider = true,
}: {
  label: string;
  value: T;
  useDivider?: boolean;
}) {
  return (
    <>
      <HStack>
        <Text as='span' fontWeight={500}>
          {label}:
        </Text>
        <Text> {value}</Text>
      </HStack>
      {useDivider && <Divider />}
    </>
  );
}
//     <StyledCustomerDetails>
//       <ButtonGroup padding='0 2rem 1rem 2rem' style={{ gridArea: "buttons" }}>
//         <Button size='small' variation='secondary'>
//           edit
//         </Button>
//         <Button size='small' variation='danger'>
//           delete
//         </Button>
//       </ButtonGroup>
//       <Header
//         customerID={customerID}
//         customerShortName={customerShortName}
//         toggleEditing={() => setIsEditing((toEdit) => !toEdit)}
//         isEditing={isEditing}
//         submitChanges={handleSubmit}
//       />
//       <Address {...{ city, address, postalCode, addressRemarks, isEditing }} />
//       <Contact
//         {...{
//           contactPersonName,
//           contactPersonPhone,
//           contactPersonMobilePhone,
//           isEditing,
//         }}
//       />
//       <Notes>
//         <EditableFormField
//           id='remarks'
//           label='remarks'
//           isEditing={isEditing}
//           value={remarks}
//           as='textarea'
//         />
//       </Notes>
//       <Service>service</Service>
//       <Child>child</Child>
//     </StyledCustomerDetails>
//   );
// }
// const StyledCustomerDetails = styled.section`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   grid-template-rows: 0.3fr 0.5fr 3fr 3fr 7fr;
//   grid-template-areas:
//     "buttons buttons"
//     "header header"
//     "address contact"
//     "service notes"
//     "child child";
//   text-align: center;
//   font-size: var(--scale-1);
//   /* grid-auto-rows: 50px; */
//   width: 100%;
//   height: 100vh;
//   padding: var(--scale-1);
// `;

// type GridItemProps = {
//   area: string;
//   backgroundColor: string;
// };

// type HeaderProps = {
//   customerID: number | undefined;
//   customerShortName: string | undefined;
//   isEditing: boolean;
//   toggleEditing: MouseEventHandler<HTMLButtonElement> | undefined;
//   submitChanges: MouseEventHandler<HTMLButtonElement> | undefined;
// };
// function Header({
//   customerID,
//   customerShortName,
//   isEditing,
//   toggleEditing,
//   submitChanges,
// }: HeaderProps) {
//   return (
//     <StyledHeader>
//       <Row type='horizontal' gap={0.5}>
//         <Heading as='h2'>{`${customerID} - `}</Heading>
//         <EditableFormField
//           id='customerShortName'
//           label=''
//           isEditing={isEditing}
//           value={customerShortName}
//         />
//       </Row>
//     </StyledHeader>
//   );
// }
// const StyledAddress = styled(Row)`
//   /* background: green; */
//   grid-area: address;
// `;
// type AddressProps = {
//   address: string;
//   city: string;
//   postalCode: string | null;
//   addressRemarks: string | null;
//   isEditing: boolean;
// };
// function Address({
//   address,
//   city,
//   postalCode,
//   addressRemarks,
//   isEditing,
// }: AddressProps) {
//   return (
//     <StyledAddress type='horizontal' gap={1}>
//       <Row>
//         <EditableFormField
//           id='address'
//           label='address'
//           isEditing={isEditing}
//           value={address}
//         />
//         <EditableFormField
//           id='city'
//           label='city'
//           isEditing={isEditing}
//           value={city}
//         />
//         <EditableFormField
//           id='postalCode'
//           label='postalCode'
//           isEditing={isEditing}
//           value={postalCode}
//         />
//       </Row>
//       <EditableFormField
//         id='addressRemarks'
//         label='addressRemarks'
//         isEditing={isEditing}
//         value={addressRemarks}
//         as='textarea'
//       />
//     </StyledAddress>
//   );
// }
// const StyledContact = styled.div`
//   background: yellow;
//   grid-area: contact;
// `;
// type ContactProps = {
//   contactPersonName: string | null;
//   contactPersonPhone: string | null;
//   contactPersonMobilePhone: string | null;
//   isEditing: boolean;
// };
// function Contact({
//   contactPersonName,
//   contactPersonPhone,
//   contactPersonMobilePhone,
//   isEditing,
// }: ContactProps) {
//   return (
//     <StyledContact>
//       <EditableFormField
//         id='contactPersonName'
//         label='contactPersonName'
//         isEditing={isEditing}
//         value={contactPersonName}
//       />

//       <EditableFormField
//         id='contactPersonPhone'
//         label='contactPersonPhone'
//         isEditing={isEditing}
//         value={contactPersonPhone}
//       />
//       <EditableFormField
//         id='contactPersonMobilePhone'
//         label='contactPersonMobilePhone'
//         isEditing={isEditing}
//         value={contactPersonMobilePhone}
//       />
//     </StyledContact>
//   );
// }
// const Service = styled.div`
//   background: pink;
//   grid-area: service;
// `;
// const Notes = styled.div`
//   background-color: blue;
//   grid-area: notes;
// `;
// const Child = styled.div`
//   background: orange;
//   grid-area: child;
// `;
// const ButtonsPanel = styled(Row)`
//   /* background: orange; */
//   grid-area: buttons;
//   padding: var(--scale-2);
// `;
// const StyledHeader = styled.div`
//   background: red;
//   grid-area: header;
//   display: flex;
//   padding: var(--scale-0);
//   & span {
//     font-size: var(--scale-4);
//     font-weight: var(--weight-extrabold);
//   }
//   justify-content: space-between;
// `;
