package main.server.sql.dto.customer;

import main.server.sql.entities.eCustomerStatus;

public record CustomerFlatDetailsRecord(Integer customerID, String customerShortName, eCustomerStatus customerStatus,
										String customerMainPhone, String address, String city) {
}
