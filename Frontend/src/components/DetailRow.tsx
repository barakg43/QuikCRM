import { HStack, Text } from "@chakra-ui/react";
import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";

export function DetailRow({
  label,
  value,
}: {
  label: string;
  value:
    | string
    | number
    | boolean
    | ReactElement<never, string | JSXElementConstructor<unknown>>
    | Iterable<ReactNode>
    | ReactPortal
    | null
    | undefined;
  useDivider?: boolean;
}) {
  return (
    <HStack>
      <Text as='span' fontWeight={500}>
        {label}:
      </Text>
      <Text> {value}</Text>
    </HStack>
  );
}
