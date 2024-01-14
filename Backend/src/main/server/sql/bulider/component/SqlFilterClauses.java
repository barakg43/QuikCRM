package main.server.sql.bulider.component;

import java.util.function.Supplier;

public class SqlFilterClauses extends SqlQueryDirector {
	private final String parameterDelimiter = ", ";
	protected StringBuilder whereClause = null;
	protected StringBuilder havingClause = null;
	protected StringBuilder orderByClause = null;
	protected StringBuilder groupByClause = null;
	protected String limitClause = null;
	private FilterClause currentFilterClause;

	//    WHERE <predicate on rows>	2.
//    GROUP BY <columns>	3.
//    HAVING <predicate on groups>	4.
//    ORDER BY <columns>
	public SqlFilterClauses(Supplier<String> queryBuilder) {
		super(queryBuilder);
	}

	public SqlFilterClauses where() {
		checkSingleClauseInQuery(whereClause, "WHERE");
		whereClause = new StringBuilder("WHERE ");
		currentFilterClause = FilterClause.WHERE;
		return this;
	}

	public SqlFilterClauses having() {
		checkSingleClauseInQuery(havingClause, "HAVING");
		havingClause = new StringBuilder("HAVING ");
		currentFilterClause = FilterClause.HAVING;
		return this;
	}

	public SqlFilterClauses groupBy(String... columnNames) {
		checkSingleClauseInQuery(groupByClause, "GROUP BY");
		groupByClause = new StringBuilder("GROUP BY ");
		for (String column : columnNames) {
			groupByClause.append(column).append(parameterDelimiter);
		}
		removeLastDelimiterFromStringBuilder(groupByClause);
		return this;
	}

	//    ORDER BY Price
//    OFFSET 5 ROWS FETCH NEXT 6 ROWS ONLY
	public SqlFilterClauses orderBy(String[] columnNames) {
		return orderBy(columnNames, -0, -1);
	}

	public SqlFilterClauses orderBy(String[] columnNames, int fromRow) {
		return orderBy(columnNames, fromRow, -1);
	}

	public SqlFilterClauses orderBy(String[] columnNames, int fromRow, int toRow) {
		checkSingleClauseInQuery(orderByClause, "ORDER BY");
		orderByClause = new StringBuilder("ORDER BY ");
		for (String column : columnNames) {
			orderByClause.append(column).append(parameterDelimiter);
		}
		removeLastDelimiterFromStringBuilder(orderByClause);
		if (fromRow > 0)
			orderByClause.append(String.format("OFFSET %d ROWS ", fromRow));
		if (fromRow > 0)
			orderByClause.append(String.format("OFFSET %d ROWS ", fromRow));

		return this;
	}

	public SqlFilterClauses limit(int rowCount) {
		if (limitClause != null)
			throw new RuntimeException("cannot use LIMIT clause more then 1 time in same query");
		limitClause = "LIMIT " + rowCount;
		return this;
	}

	public SqlFilterClauses and() {
		appendStatementToCurrentClauseBuilder(" AND ");
		return this;
	}

	public SqlFilterClauses not() {
		appendStatementToCurrentClauseBuilder(" NOT ");
		return this;
	}

	public SqlFilterClauses or() {
		appendStatementToCurrentClauseBuilder(" OR ");
		return this;
	}

	public SqlFilterClauses equal(String columnName, Object value, boolean isStringValue) {
		appendConditionToClause(columnName, value, "=", isStringValue);
		return this;
	}

	public SqlFilterClauses notEqual(String columnName, Object value, boolean isStringValue) {
		appendConditionToClause(columnName, value, "<>", isStringValue);
		return this;
	}

	public SqlFilterClauses greaterThan(String columnName, Object value, boolean isStringValue) {
		appendConditionToClause(columnName, value, ">", isStringValue);
		return this;
	}

	public SqlFilterClauses greaterOrEqualThan(String columnName, Object value, boolean isStringValue) {
		appendConditionToClause(columnName, value, ">=", isStringValue);
		return this;
	}

	public SqlFilterClauses lessThan(String columnName, Object value, boolean isStringValue) {
		appendConditionToClause(columnName, value, "<", isStringValue);
		return this;
	}

	public SqlFilterClauses lessOrEqualThan(String columnName, Object value, boolean isStringValue) {
		appendConditionToClause(columnName, value, "<=", isStringValue);
		return this;
	}

	public SqlFilterClauses between(String columnName, Object leftValue, Object rightValue, boolean isStringValues) {
		String leftValueFormatted = String.format(isStringValues ? "'%s'" : "%s", leftValue);
		String rightValueValueFormatted = String.format(isStringValues ? "'%s'" : "%s",
				rightValue);
		appendStatementToCurrentClauseBuilder(String.format("%s %s BETWEEN %s", columnName, leftValueFormatted,
				rightValueValueFormatted));
		return this;
	}

	public SqlFilterClauses like(String columnName, String stringPattern) {
		appendStatementToCurrentClauseBuilder(String.format("%s LIKE %s", columnName, stringPattern));
		return this;
	}

	public SqlFilterClauses in(String columnName, Object... values) {
		StringBuilder valuesBuilder = new StringBuilder();

		for (Object value :
				values) {
			String valueFormatted = String.format(value.getClass() == String.class ? "'%s'" : "%s", value);
			valuesBuilder.append(valueFormatted).append(parameterDelimiter);
		}
		removeLastDelimiterFromStringBuilder(valuesBuilder);
		appendStatementToCurrentClauseBuilder(String.format("%s IN (%s)", columnName, valuesBuilder));
		return this;
	}

	private void removeLastDelimiterFromStringBuilder(StringBuilder clauseBuilder) {
		if (clauseBuilder.length() >= parameterDelimiter.length())
			clauseBuilder.delete(clauseBuilder.length() - parameterDelimiter.length(), clauseBuilder.length());
	}

	private void appendConditionToClause(String columnName, Object value, String operator, boolean isStringValue) {
		String valueFormat = isStringValue ? "'%s'" : "%s";
		appendStatementToCurrentClauseBuilder(String.format("%s %s " + valueFormat, columnName, operator, value));
	}

	private void appendStatementToCurrentClauseBuilder(String statement) {
		StringBuilder currentClauseBuilder;
		switch (currentFilterClause) {
			case WHERE -> currentClauseBuilder = whereClause;
			case HAVING -> currentClauseBuilder = havingClause;
			default -> throw new RuntimeException("must choose filter clause where or having");
		}
		currentClauseBuilder.append(statement);
	}

	private void checkSingleClauseInQuery(StringBuilder clauseBuilder, String clauseName) {
		if (clauseBuilder != null)
			throw new RuntimeException(String.format("cannot use %s clause more then 1 time in same query",
					clauseName));
	}

	private enum FilterClause {
		HAVING, WHERE
	}
//    SELECT <columns>	5.
//    FROM <table>	1.
//    WHERE <predicate on rows>	2.
//    GROUP BY <columns>	3.
//    HAVING <predicate on groups>	4.
//    ORDER BY <columns>	6.
//    OFFSET	7.
//    FETCH FIRST	8.


}


