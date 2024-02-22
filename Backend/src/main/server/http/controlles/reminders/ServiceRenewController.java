package main.server.http.controlles.reminders;

import main.server.http.HttpRequestExecutor;
import main.server.sql.dto.reminder.ContractRecord;
import main.server.sql.services.ContractService;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173"})
@RestController
@RequestMapping("/api/reminders/service")
public class ServiceRenewController {
	private final HttpRequestExecutor httpRequestExecutor;
	private final ContractService contractService;

	public ServiceRenewController(HttpRequestExecutor httpRequestExecutor,
								  ContractService contractService) {
		this.httpRequestExecutor = httpRequestExecutor;
		this.contractService = contractService;
	}

	@GetMapping("/reminders")
	public List<ContractRecord> getServiceRenewsReminders(int daysBeforeExpiration, int monthsAfterExpiration) {
		return httpRequestExecutor.executeHttpRequest(() -> contractService.getServiceRenewReminders(monthsAfterExpiration, daysBeforeExpiration), "/api/reminders" +
						"/renews",
				HttpMethod.GET);


	}


	@PostMapping
	public void addNewContract(@RequestBody ContractRecord contractRecord) {
		httpRequestExecutor.executeHttpRequest(() -> contractService.addNewContract(contractRecord),
				"/api/reminders/service", HttpMethod.POST);
	}

	@PatchMapping("/renew")
	public void renewContractForPeriodTime(@RequestBody ContractRecord contractRecord) {
		try {
			httpRequestExecutor.executeHttpRequest(() -> contractService.renewContractForPeriod(contractRecord),
					"/api/reminders/service/renew", HttpMethod.PATCH);
		} catch (IndexOutOfBoundsException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND,
					"cannot find contract to renew with id of " + contractRecord.contractID());
		}

	}

	@DeleteMapping
	public void removeContract(@RequestParam Long contractId) {
		try {
			httpRequestExecutor.executeHttpRequest(() -> contractService.deleteContractByID(contractId),
					"/api/reminders/service", HttpMethod.DELETE);
		} catch (IndexOutOfBoundsException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND,
					"cannot find contract to delete with id of " + contractId);
		}

	}

	@PatchMapping
	public void updateContactData(@RequestBody ContractRecord contractRecord) {
		try {
			httpRequestExecutor.executeHttpRequest(() -> contractService.updateContract(contractRecord),
					"/api/reminders/service", HttpMethod.PATCH);
		} catch (IndexOutOfBoundsException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND,
					"cannot find contract to update with id of " + contractRecord.contractID());
		}
	}


}
