package main.server.uilities;

import main.server.sql.dto.reminder.ePeriodKind;

import java.sql.Timestamp;
import java.time.LocalDate;

public class UtilityFunctions {

	public static Timestamp postDateByMonthAmount(Timestamp currentDate, ePeriodKind periodToAdd) {

		return postDateByMonthAmount(currentDate, periodToAdd.getMonthsPeriod());

	}

	public static Timestamp postDateByMonthAmount(Timestamp currentDate, int periodToAdd) {

		return Timestamp.valueOf(currentDate.toLocalDateTime().plusMonths(periodToAdd).toLocalDate().atStartOfDay());

	}

	public static Timestamp postDateByMonthAmount(LocalDate localDate, int periodToAdd) {

		return Timestamp.valueOf(localDate.plusMonths(periodToAdd).atStartOfDay());

	}

	public static Timestamp postDateByDaysAmount(Timestamp currentDate, int periodToAdd) {

		return Timestamp.valueOf(currentDate.toLocalDateTime().plusDays(periodToAdd).toLocalDate().atStartOfDay());

	}

	public static Timestamp postDateByDaysAmount(LocalDate localDate, int periodToAdd) {

		return Timestamp.valueOf(localDate.plusDays(periodToAdd).atStartOfDay());

	}
}
