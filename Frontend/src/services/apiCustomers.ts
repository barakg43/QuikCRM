import { ITEMS_AMOUNT_PER_PAGE } from "../components/Pagination";
import {
  CustomerFullDataType,
  CustomerSlimDetailsProps,
  CustomersListType,
} from "../features/customers/customers";
import { httpClient } from "./axios";
import { SubsetListType } from "./globalTypes";

type allCustomerParams = {
  page: number;
};

export async function getAllCustomers({
  page,
}: allCustomerParams): Promise<CustomersListType | undefined> {
  const fromItem = (page - 1) * ITEMS_AMOUNT_PER_PAGE;
  const toItem = fromItem + ITEMS_AMOUNT_PER_PAGE;
  try {
    const { data }: { data: SubsetListType<CustomerSlimDetailsProps> } =
      await httpClient.get(`/customers`, {
        params: { fromItem, toItem },
      });
    return {
      customers: data.listSubset,
      totalItems: data.totalAmountInDataBase,
    };
  } catch (error: unknown) {
    console.log(error);
  }
}
export async function getCustomerDataByID(
  customerId: number
): Promise<CustomerFullDataType> {
  const { data }: { data: CustomerFullDataType } = await httpClient.get(
    `/customers/${customerId}`
  );
  // console.log("data", data);
  return data;
}
