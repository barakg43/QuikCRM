import styled from "styled-components";
import Table from "../../components/Table";
import { CustomerRowProps, customerStatuses } from "./CustomersTable";
import { useTranslation } from "react-i18next";
import { Key } from "react";

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

const statusToTagName: { [index: string]: string } = {
  "in-service": "blue",
  "out-of-service": "red",
  "bank-hours": "pink",
  "cloud-server": "orange",
  "cloud-mail": "green",
  charge: "yellow",
  none: "white",
};
const Tag = styled.span<{ type: string }>`
  border-radius: var(--radius-lg);
  color: var(--color-${(props) => props.type}-100);
  background-color: var(--color-${(props) => props.type}-700);
  padding: var(--scale-0);
`;

function CustomerRow({
  customerID,
  customerName,
  address,
  city,
  status,
}: CustomerRowProps) {
  const { t } = useTranslation("customers", { keyPrefix: "status" });
  const statusString = (status || "none").trim(); //TODO: fix the trim
  return (
    <Table.Row>
      <span>{customerID}</span>
      <span>{customerName}</span>
      <span>{address}</span>
      <span>{city}</span>
      <Tag type={statusToTagName[statusString]}>
        {statusString !== "none" && t(statusString)}
      </Tag>
    </Table.Row>
  );
}

export default CustomerRow;
