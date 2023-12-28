export type CustomerType = {
  customerID: number;
  activeContractID: number;
  customerShortName: string;
  customerName: string;
  customerStatus: CustomerStatus;
  customerIdentificationNumber: string;
  customerMainPhone: string;
  customerMainFax: string;
  customerMainEMail: string;
  customerWebSite: string;
  remarks: string;
  address: string;
  city: string;
  postalCode: string;
  addressRemarks: string;
  contactPersonName: string;
  contactPersonPost: string;
  contactPersonPhone: string;
  contactPersonMobilePhone: string;
  contactPersonFax: string;
  contactPersonEMail: string;
};
export type CustomerDataType = {
  customers: CustomerType[];
  totalItems: number;
};
export type CustomerStatus = (typeof customerStatuses)[number] | null;
export type CustomerRowProps = {
  customerID: number;
  customerName: string;
  address: string;
  city: string;
  status: CustomerStatus;
};
