import { ServiceRenewRecord } from "../features/service-renews/serviceRenews";
import { httpClient } from "./axios";

export async function addNewServicesRenew_API({
  customerID,
  startDateOfContract,
  contractPrice,
  periodKind,
  contactDescription,
}: ServiceRenewRecord) {
  try {
    await httpClient.post(`/contract-service`, {
      customerID,
      startDateOfContract,
      contractPrice,
      periodKind,
      contactDescription,
    });
  } catch (error: unknown) {
    console.log(error);
  }
}

export async function updateServiceRenewDetails_API({
  contractID,
  startDateOfContract,
  contractPrice,
  periodKind,
  contactDescription,
}: ServiceRenewRecord) {
  try {
    httpClient.patch(`/contract-service/${contractID}`, {
      startDateOfContract,
      contractPrice,
      periodKind,
      contactDescription,
    });
  } catch (error: unknown) {
    console.log(error);
  }
}

export async function getServiceRenewById(contractID: number) {
  console.log(contractID);
}
export async function renewService_API({
  contractID,
  contractPrice,
  periodKind,
  contactDescription,
}: ServiceRenewRecord) {
  try {
    httpClient.patch(`/contract-service/${contractID}/renew`, {
      contractPrice,
      periodKind,
      contactDescription,
    });
  } catch (error: unknown) {
    console.log(error);
  }
}
export async function getAllServiceRenewForPeriodTime_API({
  daysBeforeExpiration,
  monthsAfterExpiration,
}: {
  daysBeforeExpiration: number;
  monthsAfterExpiration: number;
}) {
  try {
    httpClient.get(`/contract-service/reminders`, {
      params: {
        daysBeforeExpiration,
        monthsAfterExpiration,
      },
    });
  } catch (error: unknown) {
    console.log(error);
  }
}
export async function deleteServiceRenew_API(contractID: number) {
  try {
    httpClient.delete(`/contract-service/${contractID}`);
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
}
// function timeout(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
