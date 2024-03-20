package main.server.sql.services;


import jakarta.transaction.Transactional;
import main.server.sql.dto.reminder.ProductReminderRecord;
import main.server.sql.entities.ProductReminderEntity;
import main.server.sql.repositories.ProductReminderRepository;
import main.server.uilities.UtilityFunctions;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ProductRenewService {

	private final ProductReminderRepository productReminderRepository;


	public ProductRenewService(ProductReminderRepository productReminderRepository) {
		this.productReminderRepository = productReminderRepository;
	}

	public List<ProductReminderRecord> getRenewalReminders(int daysBeforeExpiration) {
		List<ProductReminderEntity> productReminderEntityList =
				productReminderRepository.findAllByValidityTillBefore(UtilityFunctions.postDateByDaysAmount(LocalDate.now(), daysBeforeExpiration));
		return productReminderEntityList.stream().map(ProductReminderRecord::convertFromEntity).toList();
	}

	@Transactional
	public void renewProductForPeriodTime(BigDecimal reminderId, LocalDate newValidityDate) {
		Optional<ProductReminderEntity> productReminderEntityToRenewOptional =
				productReminderRepository.findById(reminderId);

		if (productReminderEntityToRenewOptional.isPresent()) {
			ProductReminderEntity currentProductReminder = productReminderEntityToRenewOptional.get();
			ProductReminderEntity newReminder = new ProductReminderEntity();
			newReminder.setCustomerID(currentProductReminder.getCustomerID());
			newReminder.setNotes4(currentProductReminder.getNotes4());
			newReminder.setNotes2(currentProductReminder.getNotes2());
			newReminder.setProductDetailDescription(currentProductReminder.getProductDetailDescription());
			newReminder.setNotes1(currentProductReminder.getNotes1());
			newReminder.setNotes3(currentProductReminder.getNotes3());
			newReminder.setValidityTill(Timestamp.valueOf(newValidityDate.atStartOfDay()));
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
	public void updateProductReminderData(BigDecimal reminderId, ProductReminderRecord productReminderRecord) {
		Optional<ProductReminderEntity> productReminderEntityToRenewOptional =
				productReminderRepository.findById(reminderId);

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
		targetEntity.setNotes4(sourceRecord.notes4());
		targetEntity.setNotes1(sourceRecord.notes1());
		targetEntity.setNotes2(sourceRecord.notes2());
		targetEntity.setProductDetailDescription(sourceRecord.productDetailDescription());
		targetEntity.setNotes3(sourceRecord.notes3());
		targetEntity.setCustomerID(sourceRecord.customerID());


	}
}
