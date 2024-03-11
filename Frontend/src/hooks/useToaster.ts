import { useToast } from "@chakra-ui/react";

export function useToaster() {
  const toast = useToast();
  function toaster({
    title,
    description,
    status,
  }: {
    title: string;
    description: string;
    status: "info" | "warning" | "success" | "error" | "loading" | undefined;
  }) {
    toast({ title, description, status, duration: 5000 });
  }

  return toaster;
}
