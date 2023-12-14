package main.server.http.json.dto.reminder;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import java.sql.Date;
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class ReminderRecord {

    private Date DateOfReminder, TimeOfReminder;
    private String ReminderID,ReminderRemark, ResponsibleUserName;
    private int Closed;

    public void setPesponsibleUrerName(String pesponsibleUrerName) {
        ResponsibleUserName = pesponsibleUrerName;
    }
}
