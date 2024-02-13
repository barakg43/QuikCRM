package main.server.sql.dto.customer;

import main.server.sql.entities.eCustomerStatus;

public record CustomerFullDetailsRecord(
		Short customerID,
		Integer activeContractID,
		String customerShortName,
		String customerName,
		eCustomerStatus customerStatus,
		String customerIdentificationNumber,
		String customerMainPhone,
		String customerMainEMail,
		String remarks,
		String address,
		String city,
		String postalCode,
		String addressRemarks,
		String contactPersonName,
		String contactPersonPost,
		String contactPersonPhone,
		String contactPersonMobilePhone
) {
//	public CustomerFullDetailsRecord(Customer customer) {
//		this(customer.getCustomerID(),
//				customer.getActiveContractID(),
//				customer.getCustomerShortName(),
//				customer.getCustomerName(),
//				customer.getCustomerStatus(),
//				customer.getCustomerIdentificationNumber(),
//				customer.getCustomerMainPhone(),
//				customer.getCustomerMainEMail(),
//				customer.getRemarks(),
//				customer.getAddress(),
//				customer.getCity(),
//				customer.getPostalCode(),
//				customer.getAddressRemarks(),
//				customer.getContactPersonName(),
//				customer.getContactPersonPost(),
//				customer.getContactPersonPhone(),
//				customer.getContactPersonMobilePhone());
//
//	}
}



