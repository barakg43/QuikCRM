package main.server.http.controlles.reminders;

import main.server.http.HttpRequestExecutor;
import main.server.sql.dto.reminder.ServiceRenewReminderRecord;
import main.server.sql.services.ReminderService;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173"})
@RestController
@RequestMapping("/api/reminders/service-renews")
public class ServiceRenewController {
	private final HttpRequestExecutor httpRequestExecutor;
	private final ReminderService reminderSqlExecutor;

	public ServiceRenewController(HttpRequestExecutor httpRequestExecutor, ReminderService reminderSqlExecutor) {
		this.httpRequestExecutor = httpRequestExecutor;
		this.reminderSqlExecutor = reminderSqlExecutor;
	}

	@GetMapping("")
	public List<ServiceRenewReminderRecord> getServiceRenewReminders() {
		return httpRequestExecutor.executeHttpRequest(reminderSqlExecutor::getServiceRenewReminders,
				"/api/reminders/service-renews", HttpMethod.GET);

	}
}
