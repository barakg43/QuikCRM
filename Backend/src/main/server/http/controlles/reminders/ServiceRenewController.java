package main.server.http.controlles.reminders;

import main.server.http.HttpRequestExecutor;
import main.server.sql.dto.reminder.ServiceRenewReminderRecord;
import main.server.sql.executor.ReminderService;
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
	private final ReminderService reminderService;

	public ServiceRenewController(HttpRequestExecutor httpRequestExecutor, ReminderService reminderService) {
		this.httpRequestExecutor = httpRequestExecutor;
		this.reminderService = reminderService;
	}

	@GetMapping("")
	public List<ServiceRenewReminderRecord> getServiceRenewReminders() {
		return httpRequestExecutor.executeHttpRequest(reminderService::getServiceRenewReminders,
				"/api/reminders/service-renews", HttpMethod.GET);

	}
}
