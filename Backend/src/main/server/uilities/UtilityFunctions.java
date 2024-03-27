package main.server.uilities;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import main.server.sql.dto.reminder.ePeriodKind;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Set;

public class UtilityFunctions {
	public static final ValidatorFactory factory = Validation.buildDefaultValidatorFactory();

	public static Timestamp postDateByMonthAmount(Timestamp currentDate, ePeriodKind periodToAdd) {

		return postDateByMonthAmount(currentDate, periodToAdd.getMonthsPeriod());

	}

	public static Timestamp postDateByMonthAmount(Timestamp currentDate, int periodToAdd) {

		return Timestamp.valueOf(currentDate.toLocalDateTime().plusMonths(periodToAdd).plusDays(-1).toLocalDate().atStartOfDay());

	}

	public static Timestamp postDateByMonthAmount(LocalDate localDate, int periodToAdd) {

		return Timestamp.valueOf(localDate.plusMonths(periodToAdd).plusDays(-1).atStartOfDay());

	}

	public static Timestamp postDateByDaysAmount(Timestamp currentDate, int periodToAdd) {

		return Timestamp.valueOf(currentDate.toLocalDateTime().plusDays(periodToAdd).toLocalDate().atStartOfDay());

	}

	public static Timestamp postDateByDaysAmount(LocalDate localDate, int periodToAdd) {

		return Timestamp.valueOf(localDate.plusDays(periodToAdd).atStartOfDay());

	}

	public static <T> void validEntityValidations(T entityObject) throws IllegalArgumentException {

		Validator validator = factory.getValidator();
		Set<ConstraintViolation<T>> violations = validator.validate(entityObject);
		if (!violations.isEmpty()) {
			StringBuilder stringBuilderViolations = new StringBuilder();

			for (ConstraintViolation<T> violation : violations) {
				stringBuilderViolations.append(violation.getPropertyPath()).append(':').append(violation.getMessage()).append('\n');
			}
			throw new IllegalArgumentException(stringBuilderViolations.toString());

		}
	}
}
