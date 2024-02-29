package main.server.sql.dto.customer;

import main.server.sql.entities.CustomerEntity;
import main.server.sql.entities.eCustomerStatus;

public record CustomerSlimDetailsRecord(Short customerID, String customerShortName, eCustomerStatus customerStatus,
										String customerMainPhone, String address, String city) {

	public CustomerSlimDetailsRecord(CustomerEntity customerEntity) {
		this(customerEntity.getCustomerID(), customerEntity.getCustomerShortName(), customerEntity.getCustomerStatus(),
				customerEntity.getCustomerMainPhone(), customerEntity.getAddress(), customerEntity.getCity());
	}
}
