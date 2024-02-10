package main.server.sql.dto.reminder;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;

import java.util.Date;


public class ContractRecord {
	@NotNull
	private Integer ContractID;
	@NotNull
	private Integer CustomerID;
	@Nullable
	private Integer ContactPersonID;
	@NotNull
	private Integer ContractsKindID;
	@NotNull
	private Date StartDateOfContract;
	@NotNull
	private Date FinishDateOfContract;
	@NotNull
	private Integer ContractPrice;
	@NotNull
	private Integer QuantityOfMonths;
	@NotNull
	private Float Coefficient;
	@Nullable

	private String PeriodKind;
	@NotNull
	private Integer Number;
	@Nullable

	private String ContactDescription;
	@Nullable
	private Integer Renewed = 0;
	@Nullable

	private Integer ReminderID;
}
