import { Td } from "@chakra-ui/react";
import { MouseEventHandler } from "react";

export function BodyTableCell({
  text,
  onClick,
}: {
  text: string | number | string[] | undefined;
  onClick?: MouseEventHandler<HTMLTableCellElement> | undefined;
}) {
  return (
    <Td textAlign='center' lineHeight='unset' onClick={onClick}>
      {text}
    </Td>
  );
}
