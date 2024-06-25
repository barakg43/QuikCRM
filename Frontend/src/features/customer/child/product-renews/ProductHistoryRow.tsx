import { Button, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import CustomTable from "../../../../components/CustomTable";

interface ProductHistoryRowProps {
  productToRenew: ProductReminderRecord;
}
function ProductHistoryRow({ productToRenew }: ProductHistoryRowProps) {
  const { productDetailDescription, systemDetailID, price, validityTill } =
    productToRenew;
  const { t } = useTranslation("productRenews", { keyPrefix: "renew-table" });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Cell = CustomTable.Row.Cell;
  return (
    <>
      {/* <AddEditProductReminderModal productRenew={productToRenew} /> */}
      <CustomTable.Row height='100%'>
        <Cell sx={{ padding: 1 }}>{systemDetailID}</Cell>
        <Cell sx={{ padding: 1 }}>{productDetailDescription}</Cell>
        <Cell sx={{ padding: 1 }}>{price}</Cell>
        <Cell sx={{ padding: 1 }}>
          {new Date(validityTill).toLocaleDateString("en-GB")}
        </Cell>
        <Cell sx={{ padding: 1 }}>
          <Button
            _focus={{ outline: "none", boxShadow: "none" }}
            _hover={{ backgroundColor: "teal.500", color: "white" }}
            onClick={onOpen}
            fontSize={"xl"}
            padding={"0.5rem 3rem 0.5rem 3rem"}
          >
            {t("renew-button")}
          </Button>
        </Cell>
      </CustomTable.Row>
    </>
  );
}

export default ProductHistoryRow;
