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
import { CustomerFullDataType } from "../customers";

function CustomerFormModal({
  CustomerData = {},
}: {
  CustomerData: CustomerFullDataType;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(90deg)'
      />
      <ModalHeader>Add new customer</ModalHeader>
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Text>Custom backdrop filters!</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CustomerFormModal;
