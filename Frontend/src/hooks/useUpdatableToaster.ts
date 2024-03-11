import { ToastId, useToast } from "@chakra-ui/react";
import { useRef } from "react";

type statusOptions =
  | "success"
  | "info"
  | "warning"
  | "error"
  | "loading"
  | undefined;
export function useUpdatableToaster(title: string) {
  const toast = useToast();
  const toastIdRef = useRef<ToastId>();

  function updateToast(description: string, status: statusOptions) {
    if (toastIdRef.current) toast.close(toastIdRef.current);
    toast({
      title,
      description,
      status,
      duration: 3000,
    });
  }
  function createInfinityToast(description: string, status: statusOptions) {
    toastIdRef.current = toast({
      title,
      description,
      status,
      duration: null,
    });
  }

  return { updateToast, createInfinityToast };
}
