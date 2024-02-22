package main.server.sql.services;


import jakarta.transaction.Transactional;
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

	@Transactional
	public void renewProductForPeriodTime(BigDecimal reminderId, ePeriodKind periodKind) {
		Optional<ProductReminderEntity> productReminderEntityToRenewOptional =
				productReminderRepository.findById(reminderId);

		if (productReminderEntityToRenewOptional.isPresent()) {
			ProductReminderEntity currentProductReminder = productReminderEntityToRenewOptional.get();
			ProductReminderEntity newReminder = new ProductReminderEntity();
			newReminder.setCustomerID(currentProductReminder.getCustomerID());
			newReminder.setPassword(currentProductReminder.getPassword());
			newReminder.setExternalIP(currentProductReminder.getExternalIP());
			newReminder.setSystemDetailDescription(currentProductReminder.getSystemDetailDescription());
			newReminder.setInternalIP(currentProductReminder.getInternalIP());
			newReminder.setUserName(currentProductReminder.getUserName());
			newReminder.setValidityTill(UtilityFunctions.postDateByMonthAmount(currentProductReminder.getValidityTill(), periodKind));
			currentProductReminder.setValidityTill(null);
			productReminderRepository.saveAll(List.of(currentProductReminder, newReminder));
		} else
			throw new IndexOutOfBoundsException("Cannot find product reminder to renew with id of " + reminderId);
	}

	public void addNewProductReminder(ProductReminderRecord productReminderRecord) {

		ProductReminderEntity newReminderEntity = new ProductReminderEntity();
		copyAllProductRecordPropertiesToEntity(productReminderRecord, newReminderEntity);
		productReminderRepository.save(newReminderEntity);


	}

	@Transactional
	public void removeProductReminder(BigDecimal id) {
		if (productReminderRepository.existsById(id))
			productReminderRepository.deleteById(id);
		else
			throw new IndexOutOfBoundsException();
	}

	@Transactional
	public void updateProductReminderData(ProductReminderRecord productReminderRecord) {
		Optional<ProductReminderEntity> productReminderEntityToRenewOptional =
				productReminderRepository.findById(productReminderRecord.systemDetailID());

		if (productReminderEntityToRenewOptional.isPresent()) {
			ProductReminderEntity currentProductReminder = productReminderEntityToRenewOptional.get();
			copyAllProductRecordPropertiesToEntity(productReminderRecord, currentProductReminder);
			productReminderRepository.save(currentProductReminder);
		} else
			throw new IndexOutOfBoundsException("Cannot find product reminder to update with id of " + productReminderRecord.systemDetailID());

	}

	private void copyAllProductRecordPropertiesToEntity(ProductReminderRecord sourceRecord,
														ProductReminderEntity targetEntity) {
		targetEntity.setValidityTill(sourceRecord.validityTill());
		targetEntity.setPassword(sourceRecord.password());
		targetEntity.setInternalIP(sourceRecord.internalIP());
		targetEntity.setExternalIP(sourceRecord.externalIP());
		targetEntity.setSystemDetailDescription(sourceRecord.systemDetailDescription());
		targetEntity.setUserName(sourceRecord.userName());
		targetEntity.setCustomerID(sourceRecord.customerID());


	}
}
