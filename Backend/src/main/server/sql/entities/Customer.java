package main.server.sql.entities;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import main.server.sql.dto.customer.CustomerFullDetailsRecord;


@Entity
@Table(name = "tbCustomersDetails")
@Getter
@Setter
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(columnDefinition = "smallint")
	private Short customerID;
	@Column(nullable = false)
	private String customerShortName;
	@Column(nullable = false)
	private String customerName;
	@Column(columnDefinition = "nchar", length = 9)
	private String customerIdentificationNumber;
	@Column
	@Enumerated(EnumType.STRING)
	private eCustomerStatus customerStatus;
	@Column(columnDefinition = "char", length = 10)
	private String customerMainPhone;
	@Column
	private String customerMainEMail;
	@Lob
	@Column(columnDefinition = "nvarchar")
	private String remarks;
	@Column(columnDefinition = "decimal")
	private Integer activeContractID;
	@Column
	private String address;
	@Column(columnDefinition = "nchar", length = 50)
	private String city;
	@Column(columnDefinition = "char(7)", length = 7)
	private String postalCode;
	@Lob
	@Column(columnDefinition = "ntext")
	private String addressRemarks;
	@Column(columnDefinition = "nchar", length = 30)
	private String contactPersonName;
	@Column(columnDefinition = "nchar", length = 50)
	private String contactPersonPost;
	@Column(columnDefinition = "char", length = 10)
	private String contactPersonPhone;
	@Column(columnDefinition = "char", length = 11)
	private String contactPersonMobilePhone;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "activeContractID", referencedColumnName = "ContractID", insertable = false, updatable = false)
	private CustomerContract customerContracts;

	public Customer() {
	}

	public Customer(CustomerFullDetailsRecord customerFullDetailsRecord) {
		this.customerID = customerFullDetailsRecord.customerID();
		this.customerShortName = customerFullDetailsRecord.customerShortName();
		this.customerName = customerFullDetailsRecord.customerName();
		this.customerIdentificationNumber = customerFullDetailsRecord.customerIdentificationNumber();
		this.customerStatus = customerFullDetailsRecord.customerStatus();
		this.customerMainPhone = customerFullDetailsRecord.customerMainPhone();
		this.customerMainEMail = customerFullDetailsRecord.customerMainEMail();
		this.remarks = customerFullDetailsRecord.remarks();
		this.activeContractID = customerFullDetailsRecord.activeContractID();
		this.address = customerFullDetailsRecord.address();
		this.city = customerFullDetailsRecord.city();
		this.postalCode = customerFullDetailsRecord.postalCode();
		this.addressRemarks = customerFullDetailsRecord.addressRemarks();
		this.contactPersonName = customerFullDetailsRecord.contactPersonName();
		this.contactPersonPost = customerFullDetailsRecord.contactPersonPost();
		this.contactPersonPhone = customerFullDetailsRecord.contactPersonPhone();
		this.contactPersonMobilePhone = customerFullDetailsRecord.contactPersonMobilePhone();
	}

	// Constructors, getters, and setters
}
