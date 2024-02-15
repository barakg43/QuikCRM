package main.server.http.controlles.reminders;

import main.server.http.HttpRequestExecutor;
import main.server.sql.services.ContractService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = {"http://localhost:5173"})
@RestController
@RequestMapping("/api/reminders/service-renews")
public class ServiceRenewController {
	private final HttpRequestExecutor httpRequestExecutor;
	private final ContractService contractService;

	public ServiceRenewController(HttpRequestExecutor httpRequestExecutor,
								  ContractService contractService) {
		this.httpRequestExecutor = httpRequestExecutor;
		this.contractService = contractService;
	}

//	@GetMapping("")
//	public List<ServiceRenewReminderRecord> getServiceRenewReminders() {
//		return httpRequestExecutor.executeHttpRequest(reminderService::getServiceRenewReminders,
//				"/api/reminders/service-renews", HttpMethod.GET);
//
//	}
}
