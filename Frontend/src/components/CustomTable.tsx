import {
  Box,
  LayoutProps,
  ResponsiveValue,
  Table,
  Tbody,
  Text,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { MouseEventHandler, ReactNode, createContext, useContext } from "react";
import Empty from "./Empty";

const TableContext = createContext<ValueType>({ columns: "" });

function Footer({ children }: { children: ReactNode }) {
  return <Box>{children}</Box>;
}

type BodyProps<T> = {
  data: T[] | null | undefined;
  render: (item: T, index: number) => JSX.Element;
  isLoading: boolean;
  resourceName?: string | undefined;
};

function Body<T>({ data, render, resourceName }: BodyProps<T>) {
  if (data == undefined || data == null || data.length == 0)
    return <Empty resource={resourceName || "table"} />;

  return (
    <Tbody margin='0.4rem 0' minHeight='70vh'>
      {data.map(render)}
    </Tbody>
  );
}

type TableProps = {
  columns: string;
  children: ReactNode;
  variant?: ResponsiveValue<string> | undefined;
};
function CustomTable({ columns, children, variant }: TableProps) {
  return (
    <TableContext.Provider value={{ columns }}>
      <Table
        fontSize='xl'
        w='95%'
        paddingTop='var(--scale-3)'
        variant={variant}
      >
        {children}
      </Table>
    </TableContext.Provider>
  );
}

type ValueType = {
  columns: string;
};
function Header({ children }: { children: ReactNode }) {
  const { columns } = useContext(TableContext);
  return (
    <Thead>
      <Tr
        display='grid'
        gridTemplateColumns={columns}
        fontSize='1.6rem'
        columnGap='var(--scale-000)'
        alignItems='center'
        textAlign='center'
        padding='var(--scale-0)'
        borderRadius='var(--radius-md) var(--radius-md) 0 0'
        background='var(--color-primary-300)'
      >
        {children}
      </Tr>
    </Thead>
  );
}

// `;
type RowType = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  height?: React.PropsWithoutRef<LayoutProps["height"]> | undefined;
};

function Row({ onClick, height, children }: RowType) {
  const { columns } = useContext(TableContext);
  return (
    <Tr
      display='grid'
      gridTemplateColumns={columns}
      onClick={onClick}
      fontSize='1.6rem'
      height={height}
      _notLast={{ borderBottom: "1px var(--color-primary-300) solid" }}
      alignContent='center'
      alignItems='center'
    >
      {children}
    </Tr>
  );
}
CustomTable.Header = Header;
CustomTable.Row = Row;
CustomTable.Footer = Footer;
CustomTable.Body = Body;
export default CustomTable;
