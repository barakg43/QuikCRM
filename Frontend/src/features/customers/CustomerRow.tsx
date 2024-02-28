import { useNavigate } from "react-router-dom";
import Table from "../../components/CustomTable";
import StatusTag from "../../components/StatusTag";
import { CustomerSlimDetailsProps } from "./customers";
import { Td } from "@chakra-ui/react";

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
      <Td textAlign='center'>{customerID}</Td>
      <Td textAlign='center'>{customerShortName}</Td>
      <Td textAlign='center'>{address}</Td>
      <Td textAlign='center'>{city}</Td>
      <StatusTag status={customerStatus} />
    </Table.Row>
  );
}

export default CustomerRow;
