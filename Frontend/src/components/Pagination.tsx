import { Button, ButtonProps, Flex, Text } from "@chakra-ui/react";
import { MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { TbChevronsLeft, TbChevronsRight } from "react-icons/tb";
import { useSearchParams } from "react-router-dom";

export const getPagesAmount = (totalItemsAmount: number) =>
  Math.ceil(totalItemsAmount / ITEMS_AMOUNT_PER_PAGE);
export const ITEMS_AMOUNT_PER_PAGE = 10;
function Pagination({ totalItemsAmount = 0 }: { totalItemsAmount: number }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation("components", { keyPrefix: "pagination" });

  const currentPage = Number(searchParams.get("page")) || 1;
  const pagesCount = getPagesAmount(totalItemsAmount);
  if (pagesCount <= 1) return null;
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
    <Flex alignItems='center' justifyContent='space-around'>
      <PaginationButton onClick={previousPage} disabled={currentPage === 1}>
        {isRTL ? <TbChevronsRight /> : <TbChevronsLeft />}
        {t("button.previous")}
      </PaginationButton>

      <Text
        sx={{
          span: {
            fontWeight: "bold",
          },
        }}
      >
        {t("summary.showing")} <span>{currentFrom}</span> {t("summary.to")}
        <span> {currentTo}</span> {t("summary.of")}
        <span> {totalItemsAmount}</span> {t("summary.results")}
      </Text>
      <PaginationButton
        onClick={nextPage}
        disabled={currentPage === pagesCount}
      >
        {t("button.next")} {isRTL ? <TbChevronsLeft /> : <TbChevronsRight />}
      </PaginationButton>
    </Flex>
  );
}

function PaginationButton({
  children,
  onClick,
  disabled,
  ...props
}: {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean | undefined;
  props?: ButtonProps;
}) {
  console.log(children, disabled);

  return (
    <Button
      onClick={onClick}
      isDisabled={disabled}
      display='flex'
      justifyContent='space-evenly'
      alignItems='center'
      padding='var(--scale-00)'
      borderRadius='3xl'
      background='transparent'
      border='none'
      color='var(--color-brand-400)'
      _focus={{ outline: "none" }}
      _disabled={{ color: "var(--color-brand-200)" }}
      sx={{
        "&:not(:disabled):hover": {
          backgroundColor: "var(--color-primary-300)",
          color: " var(--color-brand-800)",
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
export default Pagination;
