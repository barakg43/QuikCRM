package main.server.sql.dto.customer;


public class CustomerFlatDetailsRecord {
    private Integer customerID;

    private String customerShortName;

    private String customerStatus;
    private String customerMainPhone;
    private String address;
    private String city;

    public void setCustomerID(Integer customerID) {
        this.customerID = customerID;
    }

    public void setCustomerStatus(String customerStatus) {
        this.customerStatus = customerStatus;
    }

    public void setCustomerShortName(String customerShortName) {
        this.customerShortName = customerShortName;
    }

    public void setCustomerMainPhone(String customerMainPhone) {
        this.customerMainPhone = customerMainPhone;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setCity(String city) {
        this.city = city;
    }

}
