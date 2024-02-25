import { useNavigate } from "react-router-dom";
import Table from "../../components/CustomTable";
import StatusTag from "../../components/StatusTag";
import { CustomerSlimDetailsProps } from "./customers";

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
