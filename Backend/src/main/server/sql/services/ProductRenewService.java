package main.server.sql.services;


import jakarta.persistence.EntityNotFoundException;
import main.server.sql.dto.reminder.ProductReminderRecord;
import main.server.sql.dto.reminder.ePeriodKind;
import main.server.sql.entities.ProductReminderEntity;
import main.server.sql.repositories.ProductReminderRepository;
import main.server.uilities.UtilityFunctions;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProductRenewService {

	private final ProductReminderRepository productReminderRepository;


	public ProductRenewService(ProductReminderRepository productReminderRepository) {
		this.productReminderRepository = productReminderRepository;
	}

	public List<ProductReminderRecord> getRenewalReminders() {
		List<ProductReminderEntity> productReminderEntityList =
				productReminderRepository.findAllByValidityTillBefore(Timestamp.valueOf(LocalDateTime.now().plusMonths(2).toLocalDate().atStartOfDay()));
		return productReminderEntityList.stream().map(ProductReminderRecord::convertFromEntity).toList();
	}

	public void renewProductForPeriodTime(BigDecimal reminderId, ePeriodKind periodKind) {
		Optional<ProductReminderEntity> productReminderEntityToRenewOptional =
				productReminderRepository.findById(reminderId);

		if (productReminderEntityToRenewOptional.isPresent()) {
			ProductReminderEntity currentProductReminder = productReminderEntityToRenewOptional.get();
			ProductReminderEntity newReminder = new ProductReminderEntity();
			newReminder.setCustomer(currentProductReminder.getCustomer());
			newReminder.setPassword(currentProductReminder.getPassword());
			newReminder.setExternalIP(currentProductReminder.getExternalIP());
			newReminder.setSystemDetailDescription(currentProductReminder.getSystemDetailDescription());
			newReminder.setInternalIP(currentProductReminder.getInternalIP());
			newReminder.setUserName(currentProductReminder.getUserName());
			newReminder.setValidityTill(UtilityFunctions.postDateByMonthAmount(currentProductReminder.getValidityTill(), periodKind));
			currentProductReminder.setValidityTill(null);
			productReminderRepository.save(currentProductReminder);
			productReminderRepository.save(newReminder);
		} else
			throw new EntityNotFoundException();
	}
}
