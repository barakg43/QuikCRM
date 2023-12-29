import { useParams } from "react-router-dom";
import styled from "styled-components";

const StyledCustomerDetails = styled.section``;
const test = {
  customerID: 11,
  activeContractID: 752,
  customerShortName: "גינזבורג ענת                                      ",
  customerName: "גינזבורג, עורכי דין                               ",
  customerIdentificationNumber: "513268656",
  customerMainPhone: "03-6958860",
  customerMainFax: "03-6958870",
  customerMainEMail: null,
  customerWebSite: null,
  remarks: "אישתו של קובי גינזבורג",
  address: "יגאל אלון 53\r\nבית אשדר 2000",
  city: "תל אביב                                           ",
  postalCode: null,
  addressRemarks: null,
  contactPersonName: "נטלי                          ",
  contactPersonPost: "מזכירה",
  contactPersonPhone: "03-6958860",
  contactPersonMobilePhone: null,
  contactPersonFax: "03-6958870",
  contactPersonEMail: null,
};
function CustomerDetails() {
  const { customerId } = useParams();
  return <StyledCustomerDetails>CustomerDetails</StyledCustomerDetails>;
}

export default CustomerDetails;
