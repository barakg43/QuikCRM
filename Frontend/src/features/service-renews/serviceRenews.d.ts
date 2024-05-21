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

export interface RenewServiceContractProps {
  contactDescription: string;
  contractID?: number | undefined;
  contractPrice: number;
  periodKind: PeriodType;
  startDateOfContract: Date;
}
export type PeriodType = "MONTHLY" | "QUARTERLY" | "YEARLY";
