package main.server.sql.services;


import main.server.sql.dto.reminder.ProductReminderRecord;
import main.server.sql.entities.ProductReminderEntity;
import main.server.sql.repositories.ProductReminderRepository;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProductRenewService {

	private final ProductReminderRepository productReminderRepository;


	public ProductRenewService(ProductReminderRepository productReminderRepository) {
		this.productReminderRepository = productReminderRepository;
	}

	public List<ProductReminderRecord> getRenewalReminders() {
		List<ProductReminderEntity> productReminderEntityList =
				productReminderRepository.findAllByValidityTillBefore(Timestamp.valueOf(LocalDateTime.now().plusMonths(2).toLocalDate().atStartOfDay()));
		return productReminderEntityList.stream().map(ProductReminderRecord::convertFromEntityList).toList();
	}
}
