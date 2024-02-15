package main.server.sql.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import main.server.sql.dto.reminder.ePeriodKind;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "tbCustomersContracts")
@Getter
@Setter
public class ServiceContractEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(columnDefinition = "decimal")
	private Long contractID;

	@Column(nullable = false)
	private Short customerID;

	@Column
	private Integer contactPersonID;

	@Column(nullable = false)
	private Byte contractsKindID;

	@Column(nullable = false)
	private Timestamp startDateOfContract;

	@Column()
	private Timestamp finishDateOfContract;

	@Column(nullable = false)
	private BigDecimal contractPrice;

	@Column(nullable = false)
	private Byte quantityOfMonths;

	@Column(nullable = false)
	private Float coefficient;

	@Column
	@Enumerated(EnumType.STRING)
	private ePeriodKind periodKind;

	@Column(nullable = false)
	private Byte number;

	@Column
	private String contactDescription;

	@Column
	private Boolean renewed;

	@Column
	private Long reminderID;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "customerID", referencedColumnName = "customerID", insertable = false, updatable = false)
	private CustomerEntity customer;

	// Constructors, getters, and setters
}

