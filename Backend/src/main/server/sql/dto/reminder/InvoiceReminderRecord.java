package main.server.sql.dto.reminder;

import java.sql.Date;


public class InvoiceReminderRecord {

   private String custShortName, invoiceNum,contractID;
   private Date dateOfDebit;
   private Integer renewal;


      public void setCustShortName(String custShortName) {
      custShortName = custShortName;
   }

   public void setInvoiceNum(String invoiceNum) {
      invoiceNum = invoiceNum;
   }

   public void setContractID(String contractID) {
      contractID = contractID;
   }

   public void setDateOfDebit(Date dateOfDebit) {
      dateOfDebit = dateOfDebit;
   }

   public void setRenewal(Integer renewal) {
      renewal = renewal;
   }

}
