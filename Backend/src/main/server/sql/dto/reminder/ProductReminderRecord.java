package main.server.sql.dto.reminder;

import main.server.sql.entities.ProductReminderEntity;

import java.math.BigDecimal;
import java.sql.Timestamp;

public record ProductReminderRecord(Short customerID,
									String custShortName,
									BigDecimal systemDetailID,
									String systemDetailDescription,
									String internalIP,
									String externalIP,
									String userName,
									String password,
									Timestamp validityTill) {
	public static ProductReminderRecord convertFromEntity(ProductReminderEntity productReminderEntity) {
		return new ProductReminderRecord(productReminderEntity.getCustomer().getCustomerID(),
				productReminderEntity.getCustomer().getCustomerShortName(),
				productReminderEntity.getId(),
				productReminderEntity.getSystemDetailDescription(),
				productReminderEntity.getInternalIP(),
				productReminderEntity.getExternalIP(),
				productReminderEntity.getUserName(),
				productReminderEntity.getPassword(),
				productReminderEntity.getValidityTill());


	}
}