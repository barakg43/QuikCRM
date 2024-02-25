package main.server.http.controlles;

import main.server.http.HttpRequestExecutor;
import main.server.sql.services.ContractService;
import main.server.sql.services.ProductRenewService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = {"http://localhost:5173"})
@RestController
@RequestMapping("/api/reminders")
public class ReminderController {
	private final HttpRequestExecutor httpRequestExecutor;
	private final ContractService contractService;
	private final ProductRenewService productRenewService;

	public ReminderController(ContractService contractService, HttpRequestExecutor httpRequestExecutor,
							  ProductRenewService productRenewService) {
		this.contractService = contractService;
		this.httpRequestExecutor = httpRequestExecutor;
		this.productRenewService = productRenewService;
	}


}
