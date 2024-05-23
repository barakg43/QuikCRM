interface ProductRenew {
  customerID: number;
  custShortName?: string;
  systemDetailID: number;
  productDetailDescription: string;
  notes1: string | undefined;
  notes2: string | undefined;
  notes3: string | undefined;
  notes4: string | undefined;
  validityTill: Date;
}