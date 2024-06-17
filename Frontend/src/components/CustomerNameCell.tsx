import { useNavigate } from "react-router-dom";
import CustomTable from "./CustomTable";

function CustomerNameCell({
  customerID,
  customerName,
}: {
  customerID: number;
  customerName: string;
}) {
  const navigate = useNavigate();

  return (
    <CustomTable.Row.Cell
      onClick={() => navigate(`/customers/${customerID}`)}
      sx={{
        cursor: "pointer",
        _hover: { color: "teal.500", textDecoration: "underline" },
      }}
    >
      {customerName}
    </CustomTable.Row.Cell>
  );
}

export default CustomerNameCell;
