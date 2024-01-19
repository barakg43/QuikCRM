import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import CustomerForm from "./CustomerForm";
import { useTranslation } from "react-i18next";
type CustomerFormModalProps = {
  isOpen: boolean;

  onClose: () => void;
};
function CustomerFormModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation("components", { keyPrefix: "buttons" });
  return (
    <>
      <Button colorScheme='teal' onClick={onOpen}>
        {t("edit")}
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        <ModalHeader>Add new customer</ModalHeader>
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <CustomerForm />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CustomerFormModal;
