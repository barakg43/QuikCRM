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
import ServiceRenewForm from "./ServiceRenewForm";
import { ServiceRenewRecord } from "./serviceRenews";

function ServiceRenewFormModal({
  isOpen,
  onClose,
  serviceRenew = {},
}: {
  isOpen: boolean;
  onClose: () => void;
  serviceRenew?: ServiceRenewRecord | Record<string, never>;
}) {
  const { t } = useTranslation("serviceRenews", { keyPrefix: "renew-table" });
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(90deg)'
      />
      <ModalContent minWidth={"50%"}>
        <ModalHeader marginInlineStart='2rem' fontSize='1.6rem'>
          {t("renew-title")}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ServiceRenewForm
            submitButtonRef={submitButtonRef}
            serviceRenew={serviceRenew}
            onSubmit={() => onClose()}
          />
        </ModalBody>
        <ModalFooter gap='1rem'>
          <Button fontSize='1rem' onClick={onClose}>
            {t("cancel-button")}
          </Button>
          <Button
            fontSize='1.1rem'
            fontWeight='bold'
            onClick={() => {
              submitButtonRef.current?.click();
              console.log("submit service");
            }}
          >
            {t("renew-button")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>

    // </Suspense>
  );
}

export default ServiceRenewFormModal;
