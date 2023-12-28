import { useTranslation } from "react-i18next";
import { TbChevronsLeft, TbChevronsRight } from "react-icons/tb";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  /* font-size: var(--scale-5); */
`;
const PaginationButton = styled.button`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: var(--scale-00);
  border-radius: var(--radius-xl);
  background-color: transparent;
  border: none;
  color: var(--color-brand-400);
  &:not(:disabled):hover {
    background-color: var(--color-primary-300);
    color: var(--color-brand-800);
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    color: var(--color-brand-200);
  }
`;
const P = styled.p`
  & span {
    font-weight: var(--weight-bold);
  }
`;

export const getPagesAmount = (totalItemsAmount: number) =>
  Math.ceil(totalItemsAmount / ITEMS_AMOUNT_PER_PAGE);
export const ITEMS_AMOUNT_PER_PAGE = 10;
function Pagination({ totalItemsAmount }: { totalItemsAmount: number }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation("components", { keyPrefix: "pagination" });

  const currentPage = Number(searchParams.get("page")) || 1;
  const pagesCount = getPagesAmount(totalItemsAmount);
  if (pagesCount <= 1) return null;
  console.log(pagesCount);
  const isRTL = document.dir === "rtl";
  const updatePageQuery = (pageNumber: number) => {
    searchParams.set("page", pageNumber.toString());
    setSearchParams(searchParams);
  };

  function nextPage() {
    if (currentPage < pagesCount) {
      updatePageQuery(currentPage + 1);
    }
  }

  function previousPage() {
    if (currentPage > 1) {
      updatePageQuery(currentPage - 1);
    }
  }
  const currentFrom = (currentPage - 1) * ITEMS_AMOUNT_PER_PAGE + 1;
  const currentTo =
    currentPage < pagesCount
      ? currentPage * ITEMS_AMOUNT_PER_PAGE
      : totalItemsAmount;

  return (
    <StyledPagination>
      <PaginationButton onClick={previousPage} disabled={currentPage === 1}>
        {isRTL ? <TbChevronsRight /> : <TbChevronsLeft />}
        Prev
      </PaginationButton>

      <P>
        Showing <span>{currentFrom}</span> to
        <span> {currentTo}</span> of <span>{totalItemsAmount}</span> results
      </P>
      <PaginationButton
        onClick={nextPage}
        disabled={currentPage === pagesCount}
      >
        Next {isRTL ? <TbChevronsLeft /> : <TbChevronsRight />}
      </PaginationButton>
    </StyledPagination>
  );
}

export default Pagination;
