package main.server.sql.dto.customer;

public interface CustomerFlatDetailsProjection {

	Integer getCustomerID();

	String getCustomerShortName();

	String getCustomerStatus();

	String getCustomerMainPhone();

	String getAddress();

	String getCity();
}
