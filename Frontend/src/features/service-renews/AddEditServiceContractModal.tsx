import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { ServiceRenewRecord } from "./serviceRenews";
import StyledModal from "../../components/StyledModal";

function AddEditServiceContractModal({
  customerToEdit = {},
}: {
  customerToEdit?: ServiceRenewRecord | Record<string, never>;
}) {
  const { t } = useTranslation("customers");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isEditing = Object.keys(customerToEdit).length !== 0;

  return (
    <>
      <Button colorScheme='teal' onClick={onOpen} fontSize='1.2rem'>
        {customerToEdit.customerID ? t("update.edit") : t("add.button")}
      </Button>
      <StyledModal
        isOpen={isOpen}
        isEditing={isEditing}
        onClose={onClose}
        title={isEditing ? t("update.title") : t("add.title")}
        renderBody={(submitButtonRef) => (
          <AddEditServiceContractForm
            customerToEdit={customerToEdit}
            submitRef={submitButtonRef}
            OnSubmit={onClose}
          />
        )}
      />
    </>
  );
}

export default AddEditServiceContractModal;
