package main.server.http.controlles;

import main.server.http.HttpRequestExecutor;
import main.server.sql.dto.reminder.InvoiceReminderRecord;
import main.server.sql.dto.reminder.RenewReminderRecord;
import main.server.sql.executor.ReminderService;
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
	private final ReminderService reminderService;

	public ReminderController(ReminderService reminderService, HttpRequestExecutor httpRequestExecutor) {
		this.reminderService = reminderService;
		this.httpRequestExecutor = httpRequestExecutor;
	}

	@GetMapping("/renews")
	public List<RenewReminderRecord> getRenews() {
		return httpRequestExecutor.executeHttpRequest(reminderService::getRenews, "/api/reminders/renews",
				HttpMethod.GET);


	}


	//	@GetMapping("/invoices")
	@Deprecated
	public List<InvoiceReminderRecord> getInvoiceReminders() {
		return httpRequestExecutor.executeHttpRequest(reminderService::getInvoiceReminders, "/api/reminders" +
				"/invoices", HttpMethod.GET);
	}

}
