package main.server.sql.dto.customer;

import lombok.Data;


@Data

public class CustomerFlatDetailsRecord {
	private Integer customerID;
	private String customerShortName;
	private eCustomerStatus customerStatus;
	private String customerMainPhone;
	private String address;
	private String city;

	public String getCustomerStatus() {
		return customerStatus.getStatus();
	}

	public void setCustomerStatus(String customerStatus) {
		this.customerStatus = eCustomerStatus.fromStatus(customerStatus);
	}
}