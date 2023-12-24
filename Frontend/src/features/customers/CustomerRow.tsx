import styled from "styled-components";
import Table from "../../components/Table";

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

type CustomerStatus =
  | "in-service"
  | "out-of-service"
  | "bank-hours"
  | "cloud-server"
  | "cloud-mail"
  | "charge"
  | undefined;
export type CustomerRowProps = {
  customerID: number;
  customerName: string;
  address: string;
  city: string;
  status: CustomerStatus;
};
const statusToTagName = {
  "in-service": "blue",
  "out-of-service": "red",
  "bank-hours": "green",
  "cloud-server": "orange",
  none: "white",
};
const Tag = styled.span<{ type: string }>`
  border-radius: var(--radius-lg);
  color: var(--color-${(props) => props.type}-100);
  background-color: var(--color-${(props) => props.type}-700);
`;

function CustomerRow({
  customerID,
  customerName,
  address,
  city,
  status,
}: CustomerRowProps) {
  return (
    <Table.Row>
      <span>{customerID}</span>
      <span>{customerName}</span>
      <span>{address}</span>
      <span>{city}</span>
      <Tag type={statusToTagName[status || "none"]}></Tag>
    </Table.Row>
  );
}

export default CustomerRow;
