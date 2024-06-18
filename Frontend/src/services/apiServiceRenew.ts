import {
  RenewServiceContract,
  ServiceRenewRecord,
} from "../features/service-renews/serviceRenews";
import { httpClient } from "./axios";

export async function addNewServicesRenew_API({
  customerID,
  startDateOfContract,
  contractPrice,
  periodKind,
  contractDescription,
}: ServiceRenewRecord) {
  try {
    await httpClient.post(`/contract-service`, {
      customerID,
      startDateOfContract,
      contractPrice,
      periodKind,
      contractDescription,
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
  }
}
export async function getAllServiceRenewForPeriodTime_API({
  daysBeforeExpiration,
  monthsAfterExpiration,
}: {
  daysBeforeExpiration: number;
  monthsAfterExpiration: number;
}): Promise<ServiceRenewRecord[] | never[] | undefined> {
  try {
    //   const { data }: { data: SubsetListType<CustomerSlimDetailsProps> } =
    //     await httpClient.get(`/customers`, {
    //       params: { pageNumber: page - 1, pageSize: ITEMS_AMOUNT_PER_PAGE },
    //     });
    //   return {
    //     customers: data.listSubset,
    //     totalItems: data.totalAmountInDataBase,
    //   };
    return await httpClient.get(`/contract-service/reminders`, {
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
