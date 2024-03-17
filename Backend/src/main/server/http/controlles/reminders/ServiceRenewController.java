package main.server.http.controlles.reminders;

import main.server.http.HttpRequestExecutor;
import main.server.sql.dto.reminder.ContractRecord;
import main.server.sql.services.ContractService;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/contact-service")
public class ServiceRenewController {
	private final HttpRequestExecutor httpRequestExecutor;
	private final ContractService contractService;

	public ServiceRenewController(HttpRequestExecutor httpRequestExecutor,
								  ContractService contractService) {
		this.httpRequestExecutor = httpRequestExecutor;
		this.contractService = contractService;
	}

	@GetMapping("/reminders")
	public List<ContractRecord> getServiceRenewsReminders(@RequestParam int daysBeforeExpiration,
														  @RequestParam int monthsAfterExpiration) {
		return httpRequestExecutor.executeHttpRequest(() -> contractService.getServiceRenewRemindersInPeriodTime(monthsAfterExpiration, daysBeforeExpiration), "/api/reminders" +
						"/renews",
				HttpMethod.GET);


	}


	@PostMapping
	public void addNewContract(@RequestBody ContractRecord contractRecord) {
		try {
			httpRequestExecutor.executeHttpRequest(() -> contractService.addNewContract(contractRecord),
					"/api/reminders/service", HttpMethod.POST);
		} catch (IllegalStateException e) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
		} catch (IllegalArgumentException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}

	}

	@PatchMapping("{contractId}/renew/")
	public void renewContractForPeriodTime(@PathVariable Long contractId, @RequestBody ContractRecord contractRecord) {
		try {
			httpRequestExecutor.executeHttpRequest(() -> contractService.renewContractForPeriod(contractId,
							contractRecord),
					"/api/reminders/service/renew/" + contractId, HttpMethod.PATCH);
		} catch (IndexOutOfBoundsException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND,
					"cannot find contract to renew with id of " + contractId);
		}
	}

	@DeleteMapping("{contractId}")
	public void removeContract(@PathVariable Long contractId) {
		try {
			httpRequestExecutor.executeHttpRequest(() -> contractService.deleteContractByID(contractId),
					"/api/reminders/service", HttpMethod.DELETE);
		} catch (IndexOutOfBoundsException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND,
					"cannot find contract to delete with id of " + contractId);
		}

	}

	@PatchMapping("{contractId}")
	public void updateContactData(@PathVariable Long contractId, @RequestBody ContractRecord contractRecord) {
		try {
			httpRequestExecutor.executeHttpRequest(() -> contractService.updateContract(contractId, contractRecord),
					"/api/reminders/service", HttpMethod.PATCH);
		} catch (IndexOutOfBoundsException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND,
					"cannot find contract to update with id of " + contractRecord.contractID());
		}
	}


}
