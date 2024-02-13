package main.server.sql.dto.customer;

import main.server.sql.entities.eCustomerStatus;

public record CustomerSlimDetailsRecord(Integer customerID, String customerShortName, eCustomerStatus customerStatus,
										String customerMainPhone, String address, String city) {
	public CustomerSlimDetailsRecord(Integer customerID, String customerShortName, String customerStatus,
									 String customerMainPhone, String address, String city) {
		this.customerID = customerID;
		this.customerShortName = customerShortName;
		this.customerStatus = customerStatus;
		this.customerMainPhone = customerMainPhone;
		this.address = address;
		this.city = city;
	}
}
