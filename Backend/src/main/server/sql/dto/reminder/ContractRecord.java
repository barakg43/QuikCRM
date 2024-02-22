package main.server.sql.dto.reminder;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;

//convert it to record


public record ContractRecord(@NotNull Long contractID, @NotNull Short customerID, String customerShortName,
							 @NotNull Timestamp startDateOfContract,
							 @NotNull Timestamp finishDateOfContract, @Nullable BigDecimal contractPrice,
							 @NotNull ePeriodKind periodKind,
							 @Nullable String contactDescription) {
}