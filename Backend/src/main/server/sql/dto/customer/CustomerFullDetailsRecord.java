package main.server.sql.dto.customer;

import lombok.Data;

@Data
public class CustomerFullDetailsRecord {

	Integer customerID, activeContractID;

	private String customerShortName;
	private String customerName;
	private String customerStatus;


	private String customerIdentificationNumber;
	private String customerMainPhone;
	private String customerMainFax;
	private String customerMainEMail;
	private String customerWebSite;
	private String remarks;
	private String address;
	private String city;
	private String postalCode;
	private String addressRemarks;
	private String contactPersonName;
	private String contactPersonPost;
	private String contactPersonPhone;
	private String contactPersonMobilePhone;
	private String contactPersonFax;
	private String contactPersonEMail;

}
