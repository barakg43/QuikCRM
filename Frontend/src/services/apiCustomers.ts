import { ITEMS_AMOUNT_PER_PAGE } from "../components/Pagination";
import {
  CustomerDataType,
  CustomerType,
} from "../features/customers/customers";
import { httpClient } from "./axios";

type allCustomerParams = {
  page: number;
};

export async function getAllCustomers({
  page,
}: allCustomerParams): Promise<CustomerDataType> {
  const fromItem = (page - 1) * ITEMS_AMOUNT_PER_PAGE;
  const toItem = fromItem + ITEMS_AMOUNT_PER_PAGE;
  const { data }: { data: CustomerType[] } = await httpClient.get("/customers");
  console.log("customers", data);
  return { customers: data.slice(fromItem, toItem), totalItems: data.length };
}
export async function getCustomerDataByID(
  customerId: number
): Promise<CustomerType> {
  const { data } = await httpClient.get(`/customers/${customerId}`);
  return data;
}
