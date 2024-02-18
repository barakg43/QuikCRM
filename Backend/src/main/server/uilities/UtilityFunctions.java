package main.server.uilities;

import main.server.sql.dto.reminder.ePeriodKind;

import java.sql.Timestamp;

public class UtilityFunctions {

	public static Timestamp postDateByMonthAmount(Timestamp currentDate, ePeriodKind periodToAdd) {

		return Timestamp.valueOf(currentDate.toLocalDateTime().plusMonths(periodToAdd.getMonthsPeriod()).toLocalDate().atStartOfDay());

	}
}
