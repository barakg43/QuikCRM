import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../components/CustomTable";

interface ProductRenewRowProps extends ProductReminderRecord {
  onRenew: (product: ProductReminderRecord) => void;
}
function ProductRenewRow({
  custShortName,
  customerID,
  productDetailDescription,
  systemDetailID,
  validityTill,
  notes1,
  notes2,
  notes3,
  notes4,
  onRenew,
}: ProductRenewRowProps) {
  const navigate = useNavigate();
  const { t } = useTranslation("productRenews", { keyPrefix: "renew-table" });
  const Cell = CustomTable.Row.Cell;
  function handleRenew() {
    onRenew({
      customerID,
      productDetailDescription,
      systemDetailID,
      validityTill,
      notes1,
      notes2,
      notes3,
      notes4,
    });
  }
  return (
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
          onClick={handleRenew}
          fontSize={"xl"}
          padding={"0.5rem 3rem 0.5rem 3rem"}
        >
          {t("renew-button")}
        </Button>
      </Cell>
    </CustomTable.Row>
  );
}

export default ProductRenewRow;
