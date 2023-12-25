import { ReactNode, createContext, useContext } from "react";
import styled from "styled-components";

const TableContext = createContext<ValueType>({ columns: "" });
const CommonRow = styled.div<{ columns: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: var(--scale-00);
`;

const Footer = styled.footer``;

const EmptyTable = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const StyledBody = styled.section``;
type BodyProps<T> = {
  data: T[] | null | undefined;
  render: (item: T, index: number) => JSX.Element;
};
function Body<T>({ data, render }: BodyProps<T>) {
  if (data == undefined || data == null) return <EmptyTable />;
  console.log(data);
  return <StyledBody>{data.map(render)}</StyledBody>;
}

const StyledTable = styled.div`
  font-size: var(--scale-0000);
  border: 1px solid var(--color-primary-500);
  background-color: var(--color-primary-0);
  border-radius: var(--radius-sm);
`;
type TableProps = {
  columns: string;
  children: ReactNode;
};
function Table({ columns, children }: TableProps) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role='table'>{children}</StyledTable>
    </TableContext.Provider>
  );
}

const StyledHeader = styled(CommonRow)`
  padding: var(--scale-0);
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
  padding: 0.2rem var(--scale-0000);
`;
function Row({ children }: { children: ReactNode }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow columns={columns} role='row'>
      {children}
    </StyledRow>
  );
}

Table.Header = Header;
Table.Row = Row;
Table.Footer = Footer;
Table.Body = Body;
export default Table;
