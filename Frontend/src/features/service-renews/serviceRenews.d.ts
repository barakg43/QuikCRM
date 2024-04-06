export type ServiceRenewRecord = {
  contractID: number;
  customerID: number;
  customerShortName: string;
  startDateOfContract: Date;
  finishDateOfContract: Date;
  contractPrice: number;
  periodKind: PeriodType;
  contactDescription: string;
};
export type RenewContractProps = {
  contractID: number;
  contractPrice: number;
  periodKind: PeriodType;
  contactDescription: string;
};
export type PeriodType = "MONTHLY" | "QUARTERLY" | "YEARLY";
