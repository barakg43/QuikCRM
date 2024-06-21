import { ITEMS_AMOUNT_PER_PAGE } from "../components/Pagination";
import {
  RenewServiceContract,
  ServiceRenewRecord,
} from "../features/service-renews/serviceRenews";
import { httpClient } from "./axios";
import { SubsetListType } from "./globalTypes";

export async function addNewServicesRenew_API({
  customerID,
  startDateOfContract,
  contractPrice,
  periodKind,
  contractDescription,
}: ServiceRenewRecord) {
  try {
    await httpClient.post("/contract-service", {
      customerID,
      startDateOfContract,
      contractPrice,
      periodKind,
      contractDescription,
    });
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
}

export async function updateServiceRenewDetails_API({
  contractID,
  startDateOfContract,
  contractPrice,
  periodKind,
  contractDescription,
}: ServiceRenewRecord) {
  try {
    httpClient.patch(`/contract-service/${contractID}`, {
      startDateOfContract,
      contractPrice,
      periodKind,
      contractDescription,
    });
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
}

export async function getServiceRenewById(contractID: number) {
  console.log(contractID);
}

export async function renewService_API({
  contractID,
  contractPrice,
  periodKind,
  contractDescription,
}: RenewServiceContract) {
  try {
    httpClient.patch(`/contract-service/${contractID}/renew`, {
      contractPrice,
      periodKind,
      contractDescription,
    });
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
}
export async function getAllServiceRenewForPeriodTime_API({
  daysBeforeExpiration,
  monthsAfterExpiration,
  page,
}: {
  daysBeforeExpiration: number;
  monthsAfterExpiration: number;
  page: number;
}): Promise<SubsetListType<ServiceRenewRecord> | never | undefined> {
  try {
    return await httpClient.get("/contract-service/reminders", {
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
export async function getAllServiceContractHistoryCustomer({
  customerId,
  page,
}: {
  customerId: number;
  page: number;
}): Promise<SubsetListType<ServiceRenewRecord> | never | undefined> {
  try {
    return await httpClient.get(`/contract-service/customer/${customerId}`, {
      params: {
        pageNumber: page,
        pageSize: ITEMS_AMOUNT_PER_PAGE,
      },
    });
  } catch (error: unknown) {
    console.log(error);
    throw error;
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
