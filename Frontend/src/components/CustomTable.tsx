import { MouseEventHandler, ReactNode, createContext, useContext } from "react";
import styled from "styled-components";
import { Option } from "./StyledSelect";
import LoadingSpinner from "./LoadingSpinner";
import { ResponsiveValue, Table, TableContainer } from "@chakra-ui/react";

const TableContext = createContext<ValueType>({ columns: "" });
const CommonRow = styled.div<{ columns: string }>`
  display: grid;
  font-size: 1.6rem;
  grid-template-columns: ${(props) => props.columns};
  column-gap: var(--scale-000);
  align-items: center;
`;

const Footer = styled.footer``;

const EmptyTable = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
  min-height: 70vh;
`;
type BodyProps<T> = {
  data: T[] | null | undefined;
  render: (item: T, index: number) => JSX.Element;
  isLoading: boolean;
};
function Body<T>({ data, render }: BodyProps<T>) {
  if (data == undefined || data == null || data.length == 0)
    return <EmptyTable />;

  return <StyledBody>{data.map(render)}</StyledBody>;
}

// const StyledTable = styled.div`
//   font-size: var(--scale-3);
//   width: 95%;
//   /* border: 1px solid var(--color-primary-500); */
//   /* background-color: var(--color-primary-0); */
//   padding-top: var(--scale-3);
//   text-align: center;
// `;
type TableProps = {
  columns: string;
  children: ReactNode;
  variant?: ResponsiveValue<string> | undefined;
};
function StyledTable({ columns, children, variant }: TableProps) {
  return (
    <TableContext.Provider value={{ columns }}>
      <Table fontSize='xl' w='95%' paddingTop='' variant={variant}>
        {children}
      </Table>
    </TableContext.Provider>
  );
}

const StyledHeader = styled(CommonRow)`
  padding: var(--scale-0);
  background-color: var(--color-primary-300);
  border-radius: var(--radius-md) var(--radius-md) 0 0;
`;
type ValueType = {
  columns: string;
};
function Header({ children }: { children: ReactNode }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader columns={columns} as='header'>
      {children}
    </StyledHeader>
  );
}

const StyledRow = styled(CommonRow)`
  padding: var(--scale-2) var(--scale-1);
  &:not(:last-child) {
    border-bottom: 1px var(--color-primary-300) solid;
  }
`;
type RowType = {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
};
function Row({ onClick, children }: RowType) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow columns={columns} role='row' onClick={onClick}>
      {children}
    </StyledRow>
  );
}

StyledTable.Header = Header;
StyledTable.Row = Row;
StyledTable.Footer = Footer;
StyledTable.Body = Body;
export default StyledTable;
