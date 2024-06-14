export type ServiceRenewRecord = {
  customerID: number;
  customerShortName: string;
  startDateOfContract: Date;
  finishDateOfContract: Date;
} & RenewServiceContract;

export interface RenewServiceContract {
  contactDescription: string;
  contractID?: number | undefined;
  contractPrice: number;
  periodKind: PeriodType;
}
export type PeriodType = "MONTHLY" | "QUARTERLY" | "YEARLY";
