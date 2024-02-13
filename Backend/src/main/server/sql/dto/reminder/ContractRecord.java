package main.server.sql.dto.reminder;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Data
public class ContractRecord {
	@NotNull
	private Integer ContractID;
	@NotNull
	private Integer CustomerID;
	@NotNull
	private String customerShortName;

	@NotNull
	private Date StartDateOfContract;
	@NotNull
	private Date FinishDateOfContract;
	@NotNull
	private Integer ContractPrice;
	@Nullable
	private String PeriodKind;
	@Nullable
	private String ContactDescription;
//	@Nullable
//	private Integer Renewed = 0;
}
