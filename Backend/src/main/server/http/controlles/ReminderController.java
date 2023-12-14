package main.server.http.controlles;

import main.server.http.HttpRequestExecutor;
import main.server.http.json.dto.reminder.InvoiceReminderRecord;
import main.server.http.json.dto.reminder.ReminderRecord;
import main.server.http.json.dto.reminder.RenewReminderRecord;
import main.server.sql.executor.ClientSqlExecutor;
import main.server.sql.executor.ReminderSqlExecutor;
import main.server.sql.function.SqlFunctionExecutor;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/reminders")
public class ReminderController {
    private final HttpRequestExecutor httpRequestExecutor;
    private final ReminderSqlExecutor reminderSqlExecutor;

    public ReminderController(ReminderSqlExecutor reminderSqlExecutor, HttpRequestExecutor httpRequestExecutor) {
        this.reminderSqlExecutor = reminderSqlExecutor;
        this.httpRequestExecutor = httpRequestExecutor;
    }

    @GetMapping("/renews")
    public List<RenewReminderRecord> getRenewsForTheNext2Month(){
        return httpRequestExecutor.executeHttpRequest(reminderSqlExecutor::getRenewsForTheNext2Month,"/api/reminders/renews", HttpMethod.GET);


    }
    @GetMapping("/")
    public List<ReminderRecord> getReminders(){
        return httpRequestExecutor.executeHttpRequest(reminderSqlExecutor::getReminders,"/api/reminders", HttpMethod.GET);

    }
    @GetMapping("/invoices")
    public List<InvoiceReminderRecord> getInvoiceReminders(){
        return httpRequestExecutor.executeHttpRequest(reminderSqlExecutor::getInvoiceReminders,"/api/reminders/invoices", HttpMethod.GET);
    }

}
