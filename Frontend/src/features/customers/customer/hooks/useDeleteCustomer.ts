import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { deleteServiceRenew_API } from "../../../services/apiServiceRenew";
export function useDeleteServiceContract() {
  const toast = useToast();
  //   const { createInfinityToast, updateToast } = useUpdatableToaster(
  //     "delete service contract"
  //   );
  const { t } = useTranslation("serviceRenews", { keyPrefix: "delete" });
  const queryClient = useQueryClient();
  const { mutate: deleteServiceContract, isPending } = useMutation({
    mutationFn: deleteServiceRenew_API,
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
  return { deleteServiceContract, isPending };
}
