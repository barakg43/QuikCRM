package main.server.sql.entities;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


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
	private Long activeContractID;

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

	// Constructors, getters, and setters
}
