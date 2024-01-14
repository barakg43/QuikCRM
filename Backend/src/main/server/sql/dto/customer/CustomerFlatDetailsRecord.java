package main.server.sql.dto.customer;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.boot.jackson.JsonComponent;



public class CustomerFullDetailsRecord {
    Integer customerID,activeContractID;

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


    public void setCustomerID(Integer customerID) {
        this.customerID = customerID;
    }

    public void setActiveContractID(Integer activeContractID) {
        this.activeContractID = activeContractID;
    }
    public void setCustomerStatus(String customerStatus) {
        this.customerStatus = customerStatus;
    }
    public void setCustomerShortName(String customerShortName) {
        this.customerShortName = customerShortName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public void setCustomerIdentificationNumber(String customerIdentificationNumber) {
        this.customerIdentificationNumber = customerIdentificationNumber;
    }

    public void setCustomerMainPhone(String customerMainPhone) {
        this.customerMainPhone = customerMainPhone;
    }

    public void setCustomerMainFax(String customerMainFax) {
        this.customerMainFax = customerMainFax;
    }

    public void setCustomerMainEMail(String customerMainEMail) {
        this.customerMainEMail = customerMainEMail;
    }

    public void setCustomerWebSite(String customerWebSite) {
        this.customerWebSite = customerWebSite;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public void setAddressRemarks(String addressRemarks) {
        this.addressRemarks = addressRemarks;
    }

    public void setContactPersonName(String contactPersonName) {
        this.contactPersonName = contactPersonName;
    }

    public void setContactPersonPost(String contactPersonPost) {
        this.contactPersonPost = contactPersonPost;
    }

    public void setContactPersonPhone(String contactPersonPhone) {
        this.contactPersonPhone = contactPersonPhone;
    }

    public void setContactPersonMobilePhone(String contactPersonMobilePhone) {
        this.contactPersonMobilePhone = contactPersonMobilePhone;
    }

    public void setContactPersonFax(String contactPersonFax) {
        this.contactPersonFax = contactPersonFax;
    }

    public void setContactPersonEMail(String contactPersonEMail) {
        this.contactPersonEMail = contactPersonEMail;
    }
}
