package main.server.sql.dto.customer;

import main.server.sql.entities.eCustomerStatus;


public record CustomerFullDetailsRecord(
		Integer customerID,
		Integer activeContractID,
		String customerShortName,
		String customerName,
		eCustomerStatus customerStatus,
		String customerIdentificationNumber,
		String customerMainPhone,
		String customerMainFax,
		String customerMainEMail,
		String customerWebSite,
		String remarks,
		String address,
		String city,
		String postalCode,
		String addressRemarks,
		String contactPersonName,
		String contactPersonPost,
		String contactPersonPhone,
		String contactPersonMobilePhone,
		String contactPersonFax,
		String contactPersonEMail
) {

}



