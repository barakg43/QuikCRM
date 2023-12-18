package main.server.sql.dto.reminder;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import java.sql.Date;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class InvoiceReminderRecord {

   private String CustName, InvoiceNum,ContractID;
   private Date DateOfDebit;
   private int Renewal;

   public void setCustName(String custName) {
      CustName = custName;
   }

   public void setInvoiceNum(String invoiceNum) {
      InvoiceNum = invoiceNum;
   }

   public void setContractID(String contractID) {
      ContractID = contractID;
   }

   public void setDateOfDebit(Date dateOfDebit) {
      DateOfDebit = dateOfDebit;
   }

   public void setRenewal(int renewal) {
      Renewal = renewal;
   }
}
