package main.server.sql.dto.reminder;

import lombok.Data;

@Data
public class RenewReminderRecord {
	private String CustShortName, SystemDetailDescription, InternalIP, ExternalIP, UserName, Password, ValidityTill;
	private Integer SystemDetailID, CustomerID;
}
