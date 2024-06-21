import { Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import CustomTable from "../../../../components/CustomTable";
import { useProductRenewForCustomer } from "../../../product-renews/hooks/useProductRenewForCustomer";
import ProductHistoryRow from "./ProductHistoryRow";

function ProductHistoryTable() {
  const { productRenews, isLoading } = useProductRenewForCustomer();
  const { t } = useTranslation("productRenews");
  return (
    <CustomTable columns={"1fr ".repeat(5)}>
      <CustomTable.Header>
        <CustomTable.Header.Cell label={t("systemDetailID")} />
        <CustomTable.Header.Cell label={t("productDetailDescription")} />
        <CustomTable.Header.Cell label={t("price")} />
        <CustomTable.Header.Cell label={t("validityTill")} />
      </CustomTable.Header>
      <CustomTable.Body
        data={productRenews}
        isLoading={isLoading}
        resourceName={t("title")}
        render={(productReminder) => (
          <ProductHistoryRow
            productToRenew={productReminder}
            key={productReminder.systemDetailID}
          />
        )}
      />
      <CustomTable.Footer>
        <Box as='td'>{""}</Box>
        {/* <Pagination totalItemsAmount={totalItems} /> */}
      </CustomTable.Footer>
    </CustomTable>
  );
}

export default ProductHistoryTable;
