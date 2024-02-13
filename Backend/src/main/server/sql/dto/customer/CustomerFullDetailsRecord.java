package main.server.sql.dto.customer;

import lombok.Data;

@Data
public class CustomerFullDetailsRecord {

	private Integer customerID;
	private Integer activeContractID;
	private String customerShortName;
	private String customerName;
	private eCustomerStatus customerStatus;
	//	private Integer customerStatusID;
	private String customerIdentificationNumber;
	private String customerMainPhone;
	private String customerMainEMail;
	private String remarks;
	private String address;
	private String city;
	private String postalCode;
	private String addressRemarks;
	private String contactPersonName;
	private String contactPersonPost;
	private String contactPersonPhone;
	private String contactPersonMobilePhone;

	public String getCustomerStatus() {
		return customerStatus.getStatus();
	}

	public void setCustomerStatus(String customerStatus) {
		this.customerStatus = eCustomerStatus.fromStatus(customerStatus);
	}
	// Getters and setters
}



