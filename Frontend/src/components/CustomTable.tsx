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
// import styled from "styled-components";

const TableContext = createContext<ValueType>({ columns: "" });

function Footer({ children }: { children: ReactNode }) {
  return <Box>{children}</Box>;
}
// const EmptyTable = styled.p`
//   font-size: 1.6rem;
//   font-weight: 500;
//   text-align: center;
//   margin: 2.4rem;
// `;

type BodyProps<T> = {
  data: T[] | null | undefined;
  render: (item: T, index: number) => JSX.Element;
  isLoading: boolean;
};

// const StyledBody = styled.tbody`
//   margin: 0.4rem 0;
//   min-height: 70vh;
// `;
function Body<T>({ data, render }: BodyProps<T>) {
  if (data == undefined || data == null || data.length == 0)
    return (
      <Text
        fontSize='1.2rem'
        fontWeight={500}
        textAlign='center'
        margin='2.4rem'
      />
    );

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
function StyledTable({ columns, children, variant }: TableProps) {
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

// const CommonRow = styled.div<{ columns: string }>`
//   display: grid;
//   font-size: 1.6rem;
//   grid-template-columns: ${(props) => props.columns};
//   column-gap: var(--scale-000);
//   align-items: center;
// `;
// const StyledRow = styled(CommonRow)`
//   padding: var(--scale-2) var(--scale-1);
//   &:not(:last-child) {
//     border-bottom: 1px var(--color-primary-300) solid;
//   }
// `;
type RowType = {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
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
StyledTable.Header = Header;
StyledTable.Row = Row;
StyledTable.Footer = Footer;
StyledTable.Body = Body;
export default StyledTable;
