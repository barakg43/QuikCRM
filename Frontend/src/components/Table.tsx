import { createContext } from "react";
import styled from "styled-components";
import Header from "./Header";

const StyledTable = styled.table``;

const TableContext = createContext(null);
function Table({ columns, children }) {
  return (
    <TableContext.Provider value={columns}>
      <StyledTable>{children}</StyledTable>
    </TableContext.Provider>
  );
}
const StyledRow=styled.tr`
    
`
 const StyledHeader=styled()`
    
 `
function Header({ chlidren }) {
  return <
}
export default Table;
