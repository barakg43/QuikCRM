import { customerStatuses } from "./CustomersTable";
export type CustomerFullDataType = {
  customerID: number;
  activeContractID: number;
  customerShortName: string;
  customerName: string;
  customerStatus: customerStatuses;
  customerIdentificationNumber: string;
  customerMainPhone: string;
  customerMainEMail: string;
  remarks: string;
  address: string;
  city: string;
  postalCode: string;
  addressRemarks: string;
  contactPersonName: string;
  contactPersonPhone: string;
  contactPersonPost: string;
  contactPersonMobilePhone: string;
};

export type CustomersListType = {
  customers: CustomerSlimDetailsProps[];
  totalItems: number;
};
export type CustomerStatus = (typeof customerStatuses)[number] | undefined;
export type CustomerSlimDetailsProps = {
  customerID: number;
  customerShortName: string;
  address: string;
  city: string;
  customerStatus: CustomerStatus;
};
