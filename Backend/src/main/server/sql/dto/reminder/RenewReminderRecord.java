package main.server.sql.dto.reminder;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class RenewReminderRecord {
   private String CustShortName,SystemDetailDescription,InternalIP, ExternalIP, UserName, Password, ValidityTill;
   private int SystemDetailID,CustomerID;
   public void setCustShortName(String custShortName) {
      CustShortName = custShortName;
   }

   public void setSystemDetailDescription(String systemDetailDescription) {
      SystemDetailDescription = systemDetailDescription;
   }

   public void setInternalIP(String internalIP) {
      InternalIP = internalIP;
   }

   public void setExternalIP(String externalIP) {
      ExternalIP = externalIP;
   }

   public void setUserName(String userName) {
      UserName = userName;
   }

   public void setPassword(String password) {
      Password = password;
   }

   public void setValidityTill(String validityTill) {
      ValidityTill = validityTill;
   }

   public void setSystemDetailID(int systemDetailID) {
      SystemDetailID = systemDetailID;
   }

   public void setCustomerID(int customerID) {
      CustomerID = customerID;
   }



}
