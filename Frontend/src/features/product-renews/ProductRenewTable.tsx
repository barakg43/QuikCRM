import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomTable from "../../components/CustomTable";
import ProductRenewRow from "./ProductRenewRow";
import { useProductRenews } from "./hooks/useProductRenews";

function ProductRenewTable() {
  const { productRenews, isLoading } = useProductRenews();
  const { t } = useTranslation("productRenews", { keyPrefix: "renew-table" });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [productToRenew, setProductToRenew] = useState<ProductRenew>();
  function handleRenew(productRenew: ProductRenew) {
    setProductToRenew(productRenew);
    onOpen();
  }
  return (
    <>
      <Flex
        alignContent='center'
        justifyContent='flex-end'
        paddingBottom='10px'
        w='95%'
      >
        {/* <ServiceRenewFormModal
          isOpen={isOpen}
          onClose={onClose}
          serviceRenew={serviceToRenew}
        /> */}
      </Flex>
      <CustomTable columns={"1fr ".repeat(5)}>
        <CustomTable.Header>
          <CustomTable.Header.Cell label={t("systemDetailID")} />
          <CustomTable.Header.Cell label={t("custShortName")} />
          <CustomTable.Header.Cell label={t("productDetailDescription")} />
          <CustomTable.Header.Cell label={t("validityTill")} />
        </CustomTable.Header>
        <CustomTable.Body
          data={productRenews}
          isLoading={isLoading}
          resourceName={t("title")}
          render={(productReminder) => (
            <ProductRenewRow
              systemDetailID={productReminder.systemDetailID}
              productDetailDescription={
                productReminder.productDetailDescription
              }
              custShortName={productReminder.custShortName}
              customerID={productReminder.customerID}
              notes1={productReminder.notes1}
              notes2={productReminder.notes2}
              notes3={productReminder.notes3}
              notes4={productReminder.notes4}
              validityTill={productReminder.validityTill}
              onRenew={handleRenew}
            />
          )}
        />

        <CustomTable.Footer>
          <Box as='td'>{""}</Box>
          {/* <Pagination totalItemsAmount={totalItems} /> */}
        </CustomTable.Footer>
      </CustomTable>
    </>
  );
}

export default ProductRenewTable;
