import { useTranslation } from "react-i18next";
import StyledModal from "../../components/StyledModal";
import ProductRenewForm from "./ProductRenewForm";

function ProductRenewFormModal({
  isOpen,
  onClose,
  productRenew = {},
}: {
  isOpen: boolean;
  onClose: () => void;
  productRenew?: ProductReminderRecord | Record<string, never>;
}) {
  const { t } = useTranslation("productRenews");
  const isEditing = Object.keys(productRenew).length !== 0;

  return (
    <StyledModal
      isOpen={isOpen}
      onClose={onClose}
      isEditing={isEditing}
      title={isEditing ? t("renew-title") : t("add.title")}
      renderBody={(submitButtonRef) => (
        <ProductRenewForm
          submitButtonRef={submitButtonRef}
          productRenew={productRenew}
          onSubmit={onClose}
        />
      )}
    />
  );
}

export default ProductRenewFormModal;
