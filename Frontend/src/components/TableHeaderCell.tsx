import { Td } from "@chakra-ui/react";

export function TableHeaderCell({ label }: { label: string }) {
  return (
    <Td border='none' as={"th"} textAlign='center'>
      {label}
    </Td>
  );
}
