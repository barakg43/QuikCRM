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
	@Column
	private Integer customerID;

	@Column(nullable = false)
	private String customerShortName;

	@Column(nullable = false)
	private String customerName;

	@Column
	private String customerIdentificationNumber;

	@Column
	private Byte customerStatusID;

	@Column
	private String customerMainPhone;

	@Column
	private String customerMainEMail;

	@Lob
	@Column
	private String remarks;

//	@Column
////	private Long activeContractID;

	@Column
	private String address;

	@Column
	private String city;

	@Column
	private String postalCode;

	@Lob
	@Column
	private String addressRemarks;

	@Column
	private String contactPersonName;

	@Column
	private String contactPersonPost;

	@Column
	private String contactPersonPhone;

	@Column
	private String contactPersonMobilePhone;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "activeContractID", referencedColumnName = "ContractID", insertable = false, updatable = false)
	private CustomerContract customerContracts;

	// Constructors, getters, and setters
}
