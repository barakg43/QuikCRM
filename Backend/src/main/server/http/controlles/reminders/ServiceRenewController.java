package main.server.http.controlles.reminders;

import main.server.http.HttpRequestExecutor;
import main.server.sql.dto.reminder.ContractRecord;
import main.server.sql.services.ReminderService;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.*;

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
	public List<ContractRecord> getServiceRenewReminders(@RequestParam int daysBeforeExpiration) {
		return httpRequestExecutor.executeHttpRequest(() -> reminderSqlExecutor.getServiceRenewReminders(daysBeforeExpiration),
				"/api/reminders/service-renews", HttpMethod.GET);

	}
}
