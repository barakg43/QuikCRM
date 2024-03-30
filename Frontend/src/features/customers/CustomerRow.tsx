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
    <Table.Row onClick={() => navigate(`${customerID}`)} height='5.6rem'>
      <CustomerCell text={customerID} />
      <CustomerCell text={customerShortName} />
      <CustomerCell text={address} />
      <CustomerCell text={city} />
      <StatusTag status={customerStatus || "none"} />
    </Table.Row>
  );
}
function CustomerCell({
  text,
}: {
  text: string | number | string[] | undefined;
}) {
  return (
    <Td textAlign='center' lineHeight='unset'>
      {text}
    </Td>
  );
}

export default CustomerRow;
