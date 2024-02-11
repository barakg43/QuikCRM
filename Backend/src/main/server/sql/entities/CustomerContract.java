package main.server.sql.entities;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "tbCustomersContracts")
public class CustomerContract {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(columnDefinition = "decimal")
	private Long ContractID;

	@Column(nullable = false)
	private Short CustomerID;

	@Column
	private Integer ContactPersonID;

	@Column(nullable = false)
	private Byte ContractsKindID;

	@Column(nullable = false)
	private Date StartDateOfContract;

	@Column(nullable = false)
	private Date FinishDateOfContract;

	@Column(nullable = false)
	private BigDecimal ContractPrice;

	@Column(nullable = false)
	private Byte QuantityOfMonths;

	@Column(nullable = false)
	private Float Coefficient;

	@Column
	private String PeriodKind;

	@Column(nullable = false)
	private Byte Number;

	@Column
	private String ContactDescription;

	@Column
	private Boolean Renewed;

	@Column
	private Long ReminderID;


	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CustomerID", referencedColumnName = "customerID", insertable = false, updatable = false)
	private Customer customerDetails;

	// Constructors, getters, and setters
}
