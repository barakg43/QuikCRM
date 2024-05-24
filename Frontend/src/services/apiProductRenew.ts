import { httpClient } from "./axios";

// export type ProductRenewRecord = {
//   customerID: number;
//   custShortName: string;
//   systemDetailID: 0;
//   systemDetailDescription: string;
//   internalIP: string;
//   externalIP: string;
//   userName: string;
//   password: string;
//   validityTill: Date;
// };
export async function addNewProductReminder_API({
  customerID,
  productDetailDescription,
  systemDetailID,
  notes1,
  notes2,
  notes3,
  notes4,
  validityTill,
}: ProductReminderRecord) {
  try {
    await httpClient.post(`/product-renews`, {
      customerID,
      productDetailDescription,
      systemDetailID,
      notes1,
      notes2,
      notes3,
      notes4,
      validityTill,
    });
  } catch (error: unknown) {
    console.log(error);
  }
}

export async function updateProductReminder_API({
  productDetailDescription,
  systemDetailID,
  notes1,
  notes2,
  notes3,
  notes4,
  validityTill,
}: ProductReminderRecord) {
  try {
    httpClient.patch(`/product-renews/${systemDetailID}`, {
      productDetailDescription,
      notes1,
      notes2,
      notes3,
      notes4,
      validityTill,
    });
  } catch (error: unknown) {
    console.log(error);
  }
}

export async function getProductRemindersByCustomerId_API(customerID: number) {
  console.log(customerID);
}
export async function renewProductReminder_API({
  systemDetailID,
  validityTill,
  productDetailDescription,
  notes1,
  notes2,
  notes3,
  notes4,
}: RenewProductRecord) {
  try {
    httpClient.patch(`/product-renews/${systemDetailID}/renew`, {
      validityTill,
      productDetailDescription,
      notes1,
      notes2,
      notes3,
      notes4,
    });
  } catch (error: unknown) {
    console.log(error);
  }
}
export async function getAllProductReminderForPeriodTime_API({
  daysBeforeExpiration,
}: {
  daysBeforeExpiration: number;
}): Promise<ProductReminderRecord[] | never[] | undefined> {
  try {
    const { data } = await httpClient.get(`/product-renews/reminders`, {
      params: {
        daysBeforeExpiration,
      },
    });
    return data;
  } catch (error: unknown) {
    console.log(error);
  }
}
export async function deleteProductReminder_API(reminderId: number) {
  try {
    httpClient.delete(`/product-renews/${reminderId}`);
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
}
// function timeout(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
