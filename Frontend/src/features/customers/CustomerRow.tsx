import { useNavigate } from "react-router-dom";
import Table from "../../components/CustomTable";
import StatusTag from "../../components/StatusTag";
import { CustomerSlimDetailsProps } from "./customers";
import { BodyTableCell } from "./BodyTableCell";

function CustomerRow({
  customerID,
  customerShortName,
  address,
  city,
  customerStatus,
}: CustomerSlimDetailsProps) {
  const navigate = useNavigate();

  return (
    <Table.Row onClick={() => navigate(`${customerID}`)} height='5.6rem'>
      <BodyTableCell text={customerID} />
      <BodyTableCell text={customerShortName} />
      <BodyTableCell text={address} />
      <BodyTableCell text={city} />
      <StatusTag status={customerStatus || "none"} />
    </Table.Row>
  );
}
export default CustomerRow;
