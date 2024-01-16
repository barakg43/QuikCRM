package main.server.sql.dto.customer;

import lombok.Data;

@Data
public class CustomerFlatDetailsRecord {
	private Integer customerID;

	private String customerShortName;

	private String customerStatus;
	private String customerMainPhone;
	private String address;
	private String city;
}
