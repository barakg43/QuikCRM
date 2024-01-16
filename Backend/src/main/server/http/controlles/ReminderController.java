package main.server.http.controlles;

import main.server.http.HttpRequestExecutor;
import main.server.sql.dto.reminder.InvoiceReminderRecord;
import main.server.sql.dto.reminder.RenewReminderRecord;
import main.server.sql.dto.reminder.ServiceRenewReminderRecord;
import main.server.sql.executor.ReminderSqlExecutor;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173"})
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
	public List<RenewReminderRecord> getRenews() {
		return httpRequestExecutor.executeHttpRequest(reminderSqlExecutor::getRenews, "/api/reminders/renews",
                HttpMethod.GET);


	}

	@GetMapping("/service-renews")
	public List<ServiceRenewReminderRecord> getServiceRenewReminders() {
		return httpRequestExecutor.executeHttpRequest(reminderSqlExecutor::getServiceRenewReminders, "/api/reminders" +
                "/service-renews", HttpMethod.GET);

	}

	@GetMapping("/invoices")
	public List<InvoiceReminderRecord> getInvoiceReminders() {
		return httpRequestExecutor.executeHttpRequest(reminderSqlExecutor::getInvoiceReminders, "/api/reminders" +
                "/invoices", HttpMethod.GET);
	}

}
