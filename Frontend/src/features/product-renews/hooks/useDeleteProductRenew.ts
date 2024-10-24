import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { deleteProductReminder_API } from "../../../services/redux/api/apiProductRenew";
export function useDeleteProductReminder() {
  const toast = useToast();
  //   const { createInfinityToast, updateToast } = useUpdatableToaster(
  //     "delete service contract"
  //   );
  const { t } = useTranslation("productRenews", { keyPrefix: "delete" });
  const queryClient = useQueryClient();
  const { mutate: deleteProductReminder, isPending } = useMutation({
    mutationFn: deleteProductReminder_API,
    // onMutate: () => createInfinityToast("pending text", "loading"),
    onSuccess: () => {
      toast({
        description: t("toast-title"),
        title: t("toast-message-success"),
        status: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["product-renews"],
      });
    },
    onError: () =>
      toast({
        description: t("toast-title"),
        title: t("toast-message-error"),
        status: "error",
      }),
  });
  //   async function deleteServiceContract(id: number) {
  //     toast.promise(new Promise(() => deleteServiceContract1(id)), {
  //       success: { title: "Promise resolved", description: "Looks great" },
  //       error: { title: "Promise rejected", description: "Something wrong" },
  //       loading: { title: "Promise pending", description: "Please wait" },
  //     });
  //   }
  return { deleteProductReminder, isPending };
}
