import { Button, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../components/CustomTable";
import ProductRenewFormModal from "./ProductRenewFormModal";

interface ProductRenewRowProps {
  productToRenew: ProductReminderRecord;
}
function ProductRenewRow({ productToRenew }: ProductRenewRowProps) {
  const {
    custShortName,
    customerID,
    productDetailDescription,
    systemDetailID,
    validityTill,
  } = productToRenew;
  const navigate = useNavigate();
  const { t } = useTranslation("productRenews", { keyPrefix: "renew-table" });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Cell = CustomTable.Row.Cell;
  return (
    <>
      <ProductRenewFormModal
        isOpen={isOpen}
        onClose={onClose}
        productRenew={productToRenew}
      />
      <CustomTable.Row height='5.6rem'>
        <Cell>{systemDetailID}</Cell>
        <Cell onClick={() => navigate(`/customers/${customerID}`)}>
          {custShortName}
        </Cell>
        <Cell>{productDetailDescription}</Cell>
        <Cell>{new Date(validityTill).toLocaleDateString("en-GB")}</Cell>
        <Cell>
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

export default ProductRenewRow;
