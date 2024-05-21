import { Button, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import StyledModal from "../../../../../components/StyledModal";
import { RenewServiceContractProps } from "../../../../service-renews/serviceRenews";
import AddEditServiceContractForm from "./AddEditServiceContractForm";

function AddEditServiceContractModal({
  serviceRenewToEdit = {},
}: {
  serviceRenewToEdit?: RenewServiceContractProps | Record<string, never>;
}) {
  const { t } = useTranslation("customers");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isEditing = Object.keys(serviceRenewToEdit).length !== 0;

  return (
    <>
      <Button colorScheme='teal' onClick={onOpen} fontSize='1.2rem'>
        {serviceRenewToEdit.contractID ? t("update.edit") : t("add.button")}
      </Button>
      <StyledModal
        isOpen={isOpen}
        isEditing={isEditing}
        onClose={onClose}
        title={isEditing ? t("update.title") : t("add.title")}
        renderBody={(submitButtonRef) => (
          <AddEditServiceContractForm
            serviceRenewToEdit={serviceRenewToEdit}
            submitButtonRef={submitButtonRef}
            onSubmit={onClose}
          />
        )}
      />
    </>
  );
}

export default AddEditServiceContractModal;
