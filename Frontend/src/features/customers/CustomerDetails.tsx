import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { useCustomer } from "./hooks/useCustomer";
import LoadingSpinner from "../../components/LoadingSpinner";
import Heading from "../../components/Heading";
import Row from "../../components/Row";
import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import EditableFormField from "../../components/EditableFormField";
import Button from "../../components/Button";

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
      customerMainFax,
      customerMainEMail,
      remarks,

      address,
      city,
      postalCode,
      addressRemarks,

      contactPersonName,
      contactPersonPhone,
      contactPersonMobilePhone,

      activeContractID,
    },
    isLoading,
  } = { customer: test, isLoading: false };
  const [isEditing, setIsEditing] = useState(false);
  if (isLoading) return <LoadingSpinner />;
  function handleSubmit() {}
  return (
    <StyledCustomerDetails>
      <Header
        customerID={customerID}
        customerShortName={customerShortName}
        toggleEditing={() => setIsEditing((toEdit) => !toEdit)}
        isEditing={isEditing}
        submitChanges={handleSubmit}
      />
      <Address {...{ city, address, postalCode, addressRemarks, isEditing }} />
      <Contact
        {...{
          contactPersonName,
          contactPersonPhone,
          contactPersonMobilePhone,
          isEditing,
        }}
      />
      <Notes>
        <EditableFormField
          id='remarks'
          label='remarks'
          isEditing={isEditing}
          value={remarks}
          as='textarea'
        />
      </Notes>
      <Service>service</Service>
      <Child>child</Child>
    </StyledCustomerDetails>
  );
}
const StyledCustomerDetails = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.7fr 3fr 3fr 7fr;
  grid-template-areas:
    "header header"
    "address contact"
    "service notes"
    "child child";
  text-align: center;
  font-size: var(--scale-1);
  /* grid-auto-rows: 50px; */
  width: 100%;
  height: 100vh;
  padding: var(--scale-1);
`;

type GridItemProps = {
  area: string;
  backgroundColor: string;
};

type HeaderProps = {
  customerID: number;
  customerShortName: string;
  isEditing: boolean;
  toggleEditing: MouseEventHandler<HTMLButtonElement> | undefined;
  submitChanges: MouseEventHandler<HTMLButtonElement> | undefined;
};
function Header({
  customerID,
  customerShortName,
  isEditing,
  toggleEditing,
  submitChanges,
}: HeaderProps) {
  return (
    <StyledHeader>
      <Row type='horizontal' gap={0.5}>
        <Heading as='h2'>{`${customerID} - `}</Heading>
        <EditableFormField
          id='customerShortName'
          label=''
          isEditing={isEditing}
          value={customerShortName}
        />
      </Row>
      <Row type='horizontal' gap={0.5}>
        {isEditing && <Button onClick={submitChanges}>Save</Button>}
        <Button
          variation={isEditing ? "danger" : "secondary"}
          onClick={toggleEditing}
        >
          {isEditing ? "cancel" : "edit"}
        </Button>
      </Row>
    </StyledHeader>
  );
}
const StyledAddress = styled(Row)`
  /* background: green; */
  grid-area: address;
`;
type AddressProps = {
  address: string;
  city: string;
  postalCode: string | null;
  addressRemarks: string | null;
  isEditing: boolean;
};
function Address({
  address,
  city,
  postalCode,
  addressRemarks,
  isEditing,
}: AddressProps) {
  return (
    <StyledAddress type='horizontal' gap={1}>
      <Row>
        <EditableFormField
          id='address'
          label='address'
          isEditing={isEditing}
          value={address}
        />
        <EditableFormField
          id='city'
          label='city'
          isEditing={isEditing}
          value={city}
        />
        <EditableFormField
          id='postalCode'
          label='postalCode'
          isEditing={isEditing}
          value={postalCode}
        />
      </Row>
      <EditableFormField
        id='addressRemarks'
        label='addressRemarks'
        isEditing={isEditing}
        value={addressRemarks}
        as='textarea'
      />
    </StyledAddress>
  );
}
const StyledContact = styled.div`
  background: yellow;
  grid-area: contact;
`;
type ContactProps = {
  contactPersonName: string | null;
  contactPersonPhone: string | null;
  contactPersonMobilePhone: string | null;
  isEditing: boolean;
};
function Contact({
  contactPersonName,
  contactPersonPhone,
  contactPersonMobilePhone,
  isEditing,
}: ContactProps) {
  return (
    <StyledContact>
      <EditableFormField
        id='contactPersonName'
        label='contactPersonName'
        isEditing={isEditing}
        value={contactPersonName}
      />

      <EditableFormField
        id='contactPersonPhone'
        label='contactPersonPhone'
        isEditing={isEditing}
        value={contactPersonPhone}
      />
      <EditableFormField
        id='contactPersonMobilePhone'
        label='contactPersonMobilePhone'
        isEditing={isEditing}
        value={contactPersonMobilePhone}
      />
    </StyledContact>
  );
}
const Service = styled.div`
  background: pink;
  grid-area: service;
`;
const Notes = styled.div`
  background-color: blue;
  grid-area: notes;
`;
const Child = styled.div`
  background: orange;
  grid-area: child;
`;
const StyledHeader = styled.div`
  background: red;
  grid-area: header;
  display: flex;
  padding: var(--scale-0);
  & span {
    font-size: var(--scale-4);
    font-weight: var(--weight-extrabold);
  }
  justify-content: space-between;
`;
export default CustomerDetails;
