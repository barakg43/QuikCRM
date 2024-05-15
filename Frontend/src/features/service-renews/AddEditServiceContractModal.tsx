import { Button, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import StyledModal from "../../components/StyledModal";
import AddEditServiceContractForm from "./AddEditServiceContractForm";
import { ServiceRenewRecord } from "./serviceRenews";

function AddEditServiceContractModal({
  serviceRenewToEdit = {},
}: {
  serviceRenewToEdit?: ServiceRenewRecord | Record<string, never>;
}) {
  const { t } = useTranslation("customers");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isEditing = Object.keys(serviceRenewToEdit).length !== 0;

  return (
    <>
      <Button colorScheme='teal' onClick={onOpen} fontSize='1.2rem'>
        {serviceRenewToEdit.customerID ? t("update.edit") : t("add.button")}
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
