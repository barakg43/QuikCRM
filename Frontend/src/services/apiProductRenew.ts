import { ServiceRenewRecord } from "../features/service-renews/serviceRenews";
import { httpClient } from "./axios";
import {
  ITEMS_AMOUNT_PER_PAGE,
  ITEMS_AMOUNT_PER_TAB,
  SubsetListType,
} from "./globalTypes";

export async function addNewProductReminder_API({
  customerID,
  productDetailDescription,
  systemDetailID,
  notes1,
  notes2,
  notes3,
  notes4,
  validityTill,
}: ProductReminderRecord): Promise<number | undefined> {
  try {
    return await httpClient.post(`/product-renews`, {
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
    throw error;
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
    throw error;
  }
}

export async function getProductRemindersByCustomerId_API({
  customerID,
  page,
}: {
  customerID: number;
  page: number;
}): Promise<SubsetListType<ServiceRenewRecord> | never | undefined> {
  return await httpClient.get(`/product-renews/customer/${customerID}`, {
    params: {
      pageNumber: page,
      pageSize: ITEMS_AMOUNT_PER_TAB,
    },
  });
}
export async function renewProductReminder_API({
  systemDetailID,
  validityTill,
  productDetailDescription,
  notes1,
  notes2,
  notes3,
  notes4,
  price,
}: RenewProductRecord) {
  await httpClient.patch(`/product-renews/${systemDetailID}/renew`, {
    validityTill,
    productDetailDescription,
    notes1,
    notes2,
    notes3,
    notes4,
    price,
  });
}
export async function getAllProductReminderForPeriodTime_API({
  daysBeforeExpiration,
  monthsAfterExpiration,
  page,
}: {
  daysBeforeExpiration: number;
  monthsAfterExpiration: number;
  page: number;
}): Promise<SubsetListType<ServiceRenewRecord> | never | undefined> {
  try {
    return await httpClient.get(`/product-renews/reminders`, {
      params: {
        daysBeforeExpiration,
        monthsAfterExpiration,
        pageNumber: page,
        pageSize: ITEMS_AMOUNT_PER_PAGE,
      },
    });
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
}
export async function deleteProductReminder_API(reminderId: number) {
  try {
    await httpClient.delete(`/product-renews/${reminderId}`);
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
}
// function timeout(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
