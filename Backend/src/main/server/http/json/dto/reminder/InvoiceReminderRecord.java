package main.server.http.json.dto.reminder;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import java.sql.Date;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class InvoiceReminderRecord {

   private String CustName, InvoiceNum,ContractID;
   private Date DateOfDebit;
   private int Renewal;
}
