import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { deleteCustomer_API } from "../../../../services/apiCustomers";
export function useDeleteCustomer() {
  const toast = useToast();
  //   const { createInfinityToast, updateToast } = useUpdatableToaster(
  //     "delete service contract"
  //   );
  const [searchParams] = useSearchParams();
  const customerId = Number(searchParams.get("customerId"));
  const navigate = useNavigate();
  const { t } = useTranslation("customers", { keyPrefix: "delete" });
  const queryClient = useQueryClient();
  const { mutate: deleteCustomer, isPending } = useMutation({
    mutationFn: () => deleteCustomer_API(customerId),
    // onMutate: () => createInfinityToast("pending text", "loading"),
    onSuccess: () => {
      toast({
        description: t("toast-title"),
        title: t("toast-message-success"),
        status: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
      navigate("/customers");
    },
    onError: () =>
      toast({
        description: t("toast-title"),
        title: t("toast-message-error"),
        status: "error",
      }),
  });

  return { deleteCustomer, isPending };
}
