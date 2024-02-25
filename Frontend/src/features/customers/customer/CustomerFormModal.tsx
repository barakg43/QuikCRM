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
import { Suspense, useRef } from "react";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { CustomerFullDataType } from "../customers";
import CustomerForm from "./CustomerForm";

function CustomerFormModal({
  customerToEdit = {},
}: {
  customerToEdit?: CustomerFullDataType | Record<string, never>;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation("components", { keyPrefix: "buttons" });
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Button colorScheme='teal' onClick={onOpen}>
        {t("edit")}
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        <ModalContent minWidth={"50%"}>
          <ModalHeader>Add new customer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CustomerForm
              customerToEdit={customerToEdit}
              submitRef={submitButtonRef}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
            <Button onClick={() => submitButtonRef.current?.click()}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Suspense>
  );
}

export default CustomerFormModal;
