import { httpClient } from "./axios";

export type ProductRenewRecord = {
  customerID: number;
  custShortName: string;
  systemDetailID: 0;
  systemDetailDescription: string;
  internalIP: string;
  externalIP: string;
  userName: string;
  password: string;
  validityTill: Date;
};
export async function addNewProductReminder({
  customerID,
  internalIP,
  externalIP,
  systemDetailDescription,
  userName,
  password,
  validityTill,
}: ProductRenewRecord) {
  try {
    await httpClient.post(`/product-renews`, {
      customerID,
      internalIP,
      externalIP,
      systemDetailDescription,
      userName,
      password,
      validityTill,
    });
  } catch (error: unknown) {
    console.log(error);
  }
}

export async function updateProductReminder({
  customerID,
  systemDetailID,
  internalIP,
  externalIP,
  systemDetailDescription,
  userName,
  password,
  validityTill,
}: ProductRenewRecord) {
  try {
    httpClient.patch(`/product-renews/${systemDetailID}`, {
      customerID,
      internalIP,
      externalIP,
      systemDetailDescription,
      userName,
      password,
      validityTill,
    });
  } catch (error: unknown) {
    console.log(error);
  }
}

export async function getProductRemindersByCustomerId(customerID: number) {
  console.log(customerID);
}
export async function renewProductReminder({
  systemDetailID,
  newValidityDate,
}: {
  systemDetailID: number;
  newValidityDate: Date;
}) {
  try {
    httpClient.patch(
      `/product-renews/${systemDetailID}/renew`,
      newValidityDate
    );
  } catch (error: unknown) {
    console.log(error);
  }
}
export async function getAllProductReminderForPeriodTime({
  daysBeforeExpiration,
}: {
  daysBeforeExpiration: number;
}) {
  try {
    httpClient.get(`/product-renews/reminders`, {
      params: {
        daysBeforeExpiration,
      },
    });
  } catch (error: unknown) {
    console.log(error);
  }
}
export async function deleteProductReminder(reminderId: number) {
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
