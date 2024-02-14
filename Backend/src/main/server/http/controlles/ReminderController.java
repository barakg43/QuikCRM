package main.server.http.controlles;

import main.server.http.HttpRequestExecutor;
import main.server.sql.dto.reminder.ContractRecord;
import main.server.sql.dto.reminder.InvoiceReminderRecord;
import main.server.sql.services.ServiceContractService;
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
	private final ServiceContractService serviceContractService;

	public ReminderController(ServiceContractService serviceContractService, HttpRequestExecutor httpRequestExecutor) {
		this.serviceContractService = serviceContractService;
		this.httpRequestExecutor = httpRequestExecutor;
	}

	@GetMapping("/service-renews")
	public List<ContractRecord> getServiceRenewsReminders(int daysBeforeExpiration, int monthsAfterExpiration) {
		return httpRequestExecutor.executeHttpRequest(() -> serviceContractService.getServiceRenewReminders(monthsAfterExpiration, daysBeforeExpiration), "/api/reminders" +
						"/renews",
				HttpMethod.GET);


	}


	//	@GetMapping("/invoices")
	@Deprecated
	public List<InvoiceReminderRecord> getInvoiceReminders() {
		return httpRequestExecutor.executeHttpRequest(serviceContractService::getInvoiceReminders, "/api/reminders" +
				"/invoices", HttpMethod.GET);
	}

}
