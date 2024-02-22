package main.server.sql.dto.reminder;

public enum ePeriodKind {
	MONTHLY(1), QUARTERLY(4), YEARLY(12);
	private final int months;

	ePeriodKind(int months) {
		this.months = months;
	}

	public int getMonthsPeriod() {
		return months;
	}

	@Override
	public String toString() {
		return String.valueOf(months);

	}
}
