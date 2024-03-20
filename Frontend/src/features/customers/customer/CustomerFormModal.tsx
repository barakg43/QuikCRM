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
import { CustomerFullDataType } from "../customers";
import CustomerForm from "./CustomerForm";

function CustomerFormModal({
  customerToEdit = {},
}: {
  customerToEdit?: CustomerFullDataType | Record<string, never>;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation("customers");
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  return (
    // <Suspense fallback={<LoadingSpinner />}>
    <>
      <Button colorScheme='teal' onClick={onOpen} fontSize='1.2rem'>
        {customerToEdit.customerID ? t("edit.button") : t("add.button")}
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        <ModalContent minWidth={"50%"}>
          <ModalHeader marginInlineStart='2rem' fontSize='1.6rem'>
            {customerToEdit ? t("update.title") : t("add.title")}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CustomerForm
              customerToEdit={customerToEdit}
              submitRef={submitButtonRef}
            />
          </ModalBody>
          <ModalFooter gap='1rem'>
            <Button fontSize='1rem' onClick={onClose}>
              {t("cancel-button")}
            </Button>
            <Button
              fontSize='1.1rem'
              fontWeight='bold'
              onClick={() => submitButtonRef.current?.click()}
            >
              {customerToEdit.customerID
                ? t("update.button")
                : t("add.save-button")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    // </Suspense>
  );
}

export default CustomerFormModal;
