import { LegacyRef } from "react";
import { useParams } from "react-router-dom";
import ProductRenewPanel from "../../../product-renews/ProductRenewPanel";
import { useAddProductRenew } from "../../../product-renews/hooks/useAddProductRenew";
import { useUpdateProductRenew } from "../../../product-renews/hooks/useUpdateProductRenew";

function AddEditProductReminderForm({
  submitButtonRef,
  productRenewToEdit = {},
  onSubmit,
}: {
  submitButtonRef: LegacyRef<HTMLButtonElement> | undefined;
  productRenewToEdit?: ProductReminderRecord | Record<string, never>;
  onSubmit?: () => void;
}) {
  const {
    notes1,
    notes2,
    notes3,
    notes4,
    price,
    productDetailDescription,
    validityTill,
    systemDetailID,
  } = productRenewToEdit;
  const { customerId } = useParams();

  const { addNewProductReminder, isPending: isAdding } = useAddProductRenew();
  const { updateProductReminder, isPending: isUpdating } =
    useUpdateProductRenew();
  const isLoading = isAdding || isUpdating;
  function onSubmitForm(data: ProductReminderRecord) {
    console.log("test", data);
    if (productRenewToEdit) {
      //   updateProductReminder({ ...data, systemDetailID });
    } else {
      //   addNewProductReminder({ ...data, customerID: Number(customerId) });
    }
    onSubmit?.();
  }

  return (
    <ProductRenewPanel
      systemDetailID={systemDetailID}
      productDetailDescription={productDetailDescription}
      price={price}
      notes1={notes1}
      notes2={notes2}
      notes3={notes3}
      notes4={notes4}
      submitButtonRef={submitButtonRef}
    />
  );
}

export default AddEditProductReminderForm;
