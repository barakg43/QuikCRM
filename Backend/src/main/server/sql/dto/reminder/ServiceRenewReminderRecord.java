package main.server.sql.dto.reminder;

import lombok.Data;

import java.sql.Date;

@Data
public class ServiceRenewReminderRecord {

	private Date dateOfReminder, timeOfReminder;
	private String reminderID, reminderRemark, responsibleUserName;
	private Integer closed;
}
