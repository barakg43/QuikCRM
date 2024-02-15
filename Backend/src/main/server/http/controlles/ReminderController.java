package main.server.http.controlles;

import main.server.http.HttpRequestExecutor;
import main.server.sql.dto.reminder.ContractRecord;
import main.server.sql.dto.reminder.ProductReminderRecord;
import main.server.sql.services.ContractService;
import main.server.sql.services.ProductRenewService;
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
	private final ContractService contractService;
	private final ProductRenewService productRenewService;

	public ReminderController(ContractService contractService, HttpRequestExecutor httpRequestExecutor) {
		this.contractService = contractService;
		this.httpRequestExecutor = httpRequestExecutor;
	}

	@GetMapping("/service-renews")
	public List<ContractRecord> getServiceRenewsReminders(int daysBeforeExpiration, int monthsAfterExpiration) {
		return httpRequestExecutor.executeHttpRequest(() -> contractService.getServiceRenewReminders(monthsAfterExpiration, daysBeforeExpiration), "/api/reminders" +
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
