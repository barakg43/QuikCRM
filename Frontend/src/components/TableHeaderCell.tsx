import { Td } from "@chakra-ui/react";

function TableHeaderCell({ label }: { label: string }) {
  return (
    <Td border='none' as={"th"} textAlign='center'>
      {label}
    </Td>
  );
}
export default TableHeaderCell;
