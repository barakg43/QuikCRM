export type ServiceRenewRecord = {
  contractID: number;
  customerID: number;
  customerShortName: string;
  startDateOfContract: Date;
  finishDateOfContract: Date;
  contractPrice: number;
  periodKind: "MONTHLY" | "QUARTERLY" | "YEARLY";
  contactDescription: string;
};
