package main.server.sql.dto.reminder;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import java.sql.Date;
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class ServiceRenewReminderRecord {

    private Date dateOfReminder, timeOfReminder;
    private String reminderID,reminderRemark, responsibleUserName;
    private int closed;

    public void setDateOfReminder(Date dateOfReminder) {
        this.dateOfReminder = dateOfReminder;
    }

    public void setTimeOfReminder(Date timeOfReminder) {
        this.timeOfReminder = timeOfReminder;
    }

    public void setReminderID(String reminderID) {
        this.reminderID = reminderID;
    }

    public void setReminderRemark(String reminderRemark) {
        this.reminderRemark = reminderRemark;
    }

    public void setClosed(int closed) {
        this.closed = closed;
    }

    public void setResponsibleUserName(String responsibleUserName) {
        this.responsibleUserName = responsibleUserName;
    }
}
