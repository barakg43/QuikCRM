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
	public CustomerFullDetailsRecord(Integer customerID, Integer activeContractID, String customerShortName,
									 String customerName, int customerStatusID,
									 String customerIdentificationNumber, String customerMainPhone,
									 String customerMainFax, String customerMainEMail, String customerWebSite,
									 String remarks, String address, String city, String postalCode,
									 String addressRemarks, String contactPersonName, String contactPersonPost,
									 String contactPersonPhone, String contactPersonMobilePhone,
									 String contactPersonFax, String contactPersonEMail) {
		this(customerID,
				activeContractID,
				customerShortName,
				customerName,
				eCustomerStatus.values()[customerStatusID],
				customerIdentificationNumber,
				customerMainPhone,
				customerMainFax,
				customerMainEMail,
				customerWebSite,
				remarks,
				address,
				city,
				postalCode,
				addressRemarks,
				contactPersonName,
				contactPersonPost,
				contactPersonPhone,
				contactPersonMobilePhone,
				contactPersonFax,
				contactPersonEMail);

	}

	public CustomerFullDetailsRecord(Integer customerID, Integer activeContractID, String customerShortName,
									 String customerName, eCustomerStatus customerStatus,
									 String customerIdentificationNumber, String customerMainPhone,
									 String customerMainFax, String customerMainEMail, String customerWebSite,
									 String remarks, String address, String city, String postalCode,
									 String addressRemarks, String contactPersonName, String contactPersonPost,
									 String contactPersonPhone, String contactPersonMobilePhone,
									 String contactPersonFax, String contactPersonEMail) {
		this.customerID = customerID;
		this.activeContractID = activeContractID;
		this.customerShortName = customerShortName;
		this.customerName = customerName;
		this.customerStatus = customerStatus;
		this.customerIdentificationNumber = customerIdentificationNumber;
		this.customerMainPhone = customerMainPhone;
		this.customerMainFax = customerMainFax;
		this.customerMainEMail = customerMainEMail;
		this.customerWebSite = customerWebSite;
		this.remarks = remarks;
		this.address = address;
		this.city = city;
		this.postalCode = postalCode;
		this.addressRemarks = addressRemarks;
		this.contactPersonName = contactPersonName;
		this.contactPersonPost = contactPersonPost;
		this.contactPersonPhone = contactPersonPhone;
		this.contactPersonMobilePhone = contactPersonMobilePhone;
		this.contactPersonFax = contactPersonFax;
		this.contactPersonEMail = contactPersonEMail;
	}
}



