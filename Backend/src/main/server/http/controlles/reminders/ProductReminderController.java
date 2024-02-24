package main.server.http.controlles.reminders;

import main.server.http.HttpRequestExecutor;
import main.server.sql.dto.reminder.ProductReminderRecord;
import main.server.sql.dto.reminder.ePeriodKind;
import main.server.sql.services.ProductRenewService;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173"})
@RestController
@RequestMapping("/api/reminders/product")
public class ProductReminderController {
	private final HttpRequestExecutor httpRequestExecutor;
	private final ProductRenewService productRenewService;

	public ProductReminderController(HttpRequestExecutor httpRequestExecutor,
									 ProductRenewService productRenewService) {
		this.httpRequestExecutor = httpRequestExecutor;
		this.productRenewService = productRenewService;
	}

	@GetMapping("/reminders")
	public List<ProductReminderRecord> getInvoiceReminders(@RequestParam int daysBeforeExpiration) {
		return httpRequestExecutor.executeHttpRequest(() -> productRenewService.getRenewalReminders(daysBeforeExpiration), "/api/reminders" +
				"/product-renews", HttpMethod.GET);
	}

	@PostMapping
	public void addNewProductReminder(@RequestBody ProductReminderRecord productReminderRecord) {
		httpRequestExecutor.executeHttpRequest(() -> productRenewService.addNewProductReminder(productReminderRecord),
				"/api/reminders/product", HttpMethod.POST);
	}

	@PatchMapping("/renew")
	public void renewProductForPeriodTime(@RequestParam BigDecimal reminderId, @RequestParam ePeriodKind periodKind) {
		httpRequestExecutor.executeHttpRequest(() -> productRenewService.renewProductForPeriodTime(reminderId,
						periodKind),
				"/api/reminders/product/renew", HttpMethod.PATCH);
	}

	@DeleteMapping
	public void removeProductReminder(@RequestParam BigDecimal reminderId) {
		try {
			httpRequestExecutor.executeHttpRequest(() -> productRenewService.removeProductReminder(reminderId),
					"/api/reminders/product", HttpMethod.DELETE);
		} catch (IndexOutOfBoundsException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "cannot find product reminder to delete with id " +
					"of" +
					" " + reminderId);
		}

	}

	@PatchMapping
	public void updateProductReminderData(@RequestBody ProductReminderRecord productReminderRecord) {
		httpRequestExecutor.executeHttpRequest(() -> productRenewService.updateProductReminderData(productReminderRecord),
				"/api/reminders/product", HttpMethod.PATCH);
	}
}
