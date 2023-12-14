package main.server.http.json.dto.reminder;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class RenewReminderRecord {

   private String CustShortName,SystemDetailDescription,InternalIP, ExternalIP, UserName, Password, ValidityTill;
   private int SystemDetailID,CustomerID;

}
