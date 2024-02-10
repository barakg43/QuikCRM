import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Table from "../../components/CustomTable";
import { useNavigate } from "react-router-dom";
import StatusTag from "../../components/StatusTag";
import { CustomerSlimDetailsProps } from "./customers";

// const test = {
//   customerID: 11,
//   activeContractID: 752,
//   customerShortName: "גינזבורג ענת                                      ",
//   customerName: "גינזבורג, עורכי דין                               ",
//   customerIdentificationNumber: "513268656",
//   customerMainPhone: "03-6958860",
//   customerMainFax: "03-6958870",
//   customerMainEMail: null,
//   customerWebSite: null,
//   remarks: "אישתו של קובי גינזבורג",
//   address: "יגאל אלון 53\r\nבית אשדר 2000",
//   city: "תל אביב                                           ",
//   postalCode: null,
//   addressRemarks: null,
//   contactPersonName: "נטלי                          ",
//   contactPersonPost: "מזכירה",
//   contactPersonPhone: "03-6958860",
//   contactPersonMobilePhone: null,
//   contactPersonFax: "03-6958870",
//   contactPersonEMail: null,
// };

function CustomerRow({
  customerID,
  customerShortName,
  address,
  city,
  customerStatus,
}: CustomerSlimDetailsProps) {
  const navigate = useNavigate();

  return (
    <Table.Row onClick={() => navigate(`${customerID}`)}>
      <span>{customerID}</span>
      <span>{customerShortName}</span>
      <span>{address}</span>
      <span>{city}</span>
      <StatusTag status={customerStatus} />
    </Table.Row>
  );
}

export default CustomerRow;
