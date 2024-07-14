import { GenericAbortSignal } from "axios";
import {
  CustomerFullDataType,
  CustomerSlimDetailsProps,
  CustomersListType,
} from "../../../features/customers/customers";
import { httpClient } from "../../axios";
import { ITEMS_AMOUNT_PER_PAGE, SubsetListType } from "../../globalTypes";
import { createApi } from "../../reactQueryToolkit";
import { baseQueryWithReauth } from "../baseApi";
import { baseApi } from "../baseApi copy";

export async function getCustomersSubset_API({
  page,
  querySearch,
  signal,
}: {
  page: number;
  querySearch?: string | undefined;
  signal?: GenericAbortSignal | undefined;
}): Promise<CustomersListType | undefined> {
  try {
    const data: SubsetListType<CustomerSlimDetailsProps> = await httpClient.get(
      `/customers`,
      {
        params: {
          pageNumber: page,
          pageSize: ITEMS_AMOUNT_PER_PAGE,
          query: querySearch,
        },
        signal,
      }
    );
    return {
      customers: data.listSubset,
      totalItems: data.totalAmountInDataBase,
    };
  } catch (error: unknown) {
    console.log(error);
  }
}
export async function getCustomerDataByID_API(
  customerId: number
): Promise<CustomerFullDataType> {
  return await httpClient.get(`/customers/${customerId}`);
}
export async function addNewCustomer_API({
  customerShortName,
  customerName,
  customerIdentificationNumber,
  customerStatus,
  remarks,
  customerMainPhone,
  customerMainEMail,
  contactPersonPost,
  contactPersonPhone,
  contactPersonName,
  contactPersonMobilePhone,
  city,
  address,
  postalCode,
  addressRemarks,
}: CustomerFullDataType) {
  await httpClient.post("customers", {
    customerShortName,
    customerName,
    customerIdentificationNumber,
    customerStatus,
    remarks,
    customerMainPhone,
    customerMainEMail,
    contactPersonPost,
    contactPersonPhone,
    contactPersonName,
    contactPersonMobilePhone,
    city,
    address,
    postalCode,
    addressRemarks,
  });
}
export async function updateCustomerDetails_API({
  customerID,
  customerShortName,
  customerName,
  customerIdentificationNumber,
  customerStatus,
  remarks,
  customerMainPhone,
  customerMainEMail,
  contactPersonPost,
  contactPersonPhone,
  contactPersonName,
  contactPersonMobilePhone,
  city,
  address,
  postalCode,
  addressRemarks,
}: CustomerFullDataType) {
  await httpClient.patch(`customers/${customerID}`, {
    customerShortName,
    customerName,
    customerIdentificationNumber,
    customerStatus,
    remarks,
    customerMainPhone,
    customerMainEMail,
    contactPersonPost,
    contactPersonPhone,
    contactPersonName,
    contactPersonMobilePhone,
    city,
    address,
    postalCode,
    addressRemarks,
  });
}

export async function deleteCustomer_API(customerID: number) {
  await httpClient.delete(`customers/${customerID}`);
}

const customerApi = baseApi.buildEndpoints({
  endpoints: (builder) => ({
    customerDetails: builder.query({
      query: ({
        page,
        querySearch,
      }: {
        page: number;
        querySearch?: string | undefined;
      }) => ({
        url: "/customers",
        params: {
          pageNumber: page,
          pageSize: ITEMS_AMOUNT_PER_PAGE,
          query: querySearch,
        },
      }),

      //   transformResponse: (data: SubsetListType<CustomerSlimDetailsProps>) => ({
      //     customers: data.listSubset,
      //     totalItems: data.totalAmountInDataBase,
      //   }),
    }),
  }),
});

export const { useCustomerDetailsQuery } = customerApi;

const test = createApi({ baseQuery: baseQueryWithReauth });
const api = test.buildEndpoints({
  endpoints: (build) => ({
    test: build.query({
      query: ({ id }: { id: number }) => ({ url: "test" }),
      providesTags: ({ id }) => ["test1"],
      //   transformErrorResponse: (data: unknown) => data,
    }),
    mutateTest: build.mutation({
      query: (yosii: number) => ({ url: "mutate" }),
      invalidatesTags: (test) => ["test1", "test2", test],
    }),
  }),
});
