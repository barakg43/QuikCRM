package main.server.sql.bulider.component;

import java.util.Map;

public class SqlBaseClauses {
	protected final StringBuilder additionalParameters = new StringBuilder();
	protected final StringBuilder additionalJoins = new StringBuilder();
	private final String parameterDelimiter = ", ";
	private final SqlFilterClauses sqlFilterClauses;
	protected eBaseClause baseClause = null;


	public SqlBaseClauses(SqlFilterClauses sqlFilterClauses) {
		this.sqlFilterClauses = sqlFilterClauses;
	}

	public SqlFilterClauses select(String... columnNames) {
		baseClauseDuplicateValidation();
		baseClause = eBaseClause.SELECT;

		for (String columnName : columnNames) {
			additionalParameters.append(columnName).append(parameterDelimiter);
		}
		removeLastDelimiterFromStringBuilder(additionalParameters);
		return sqlFilterClauses;
	}
//    BEGIN TRANSACTION
//    INSERT tbConnectionPriceQuotesDetails (
//            PQSDetailsID,
//            PQCDetailsID)
//    VALUES (
//            @PQSDetailsID,
//            @PQCDetailsID)
//    IF @@error <> 0
//    BEGIN
//    ROLLBACK TRAN
//    RETURN
//            END
//
//    COMMIT TRANSACTION


	public SqlFilterClauses insert(Map<String, Object> columnValues) {
		baseClauseDuplicateValidation();
		baseClause = eBaseClause.INSERT;
		StringBuilder columnNamesParameters = new StringBuilder();
		StringBuilder valuesParameters = new StringBuilder();
		for (Map.Entry<String, Object> columnEntry : columnValues.entrySet()) {
			columnNamesParameters.append(columnEntry.getKey()).append(parameterDelimiter);
			valuesParameters.append(columnEntry.getValue()).append(parameterDelimiter);
		}
		removeLastDelimiterFromStringBuilder(columnNamesParameters);
		removeLastDelimiterFromStringBuilder(valuesParameters);
		columnNamesParameters.append(")");
		valuesParameters.append(")");

		additionalParameters.append(columnNamesParameters).append("\n\t\t VALUES (").append(valuesParameters);
		return sqlFilterClauses;
	}


	/*
	* BEGIN TRANSACTION

	UPDATE tbInvoicesForContracts
	SET dateOfDebit = DATEADD(MONTH, @MonthAmount, dateOfDebit)
	WHERE id = @ID

		IF @@error <> 0
			BEGIN
				ROLLBACK TRAN
				RETURN
			END

COMMIT TRANSACTION

*/
	public SqlFilterClauses update(Map<String, Object> columnValues) {
		baseClauseDuplicateValidation();
		baseClause = eBaseClause.UPDATE;
		for (Map.Entry<String, Object> columnEntry : columnValues.entrySet()) {
			additionalParameters.append(columnEntry.getKey()).append(" = ").append(columnEntry.getValue()).append(parameterDelimiter);
		}
		removeLastDelimiterFromStringBuilder(additionalParameters);
		return sqlFilterClauses;
	}
//    BEGIN TRANSACTION
//
//    DELETE
//    FROM tbConnectionPriceQuotesDetails
//    WHERE PQSDetailsID = @PQSDetailsID
//            AND PQCDetailsID = @PQCDetailsID
//
//    IF @@error <> 0
//    BEGIN
//    ROLLBACK TRAN
//    RETURN
//            END
//
//    COMMIT TRANSACTION

	public SqlFilterClauses delete() {
		baseClauseDuplicateValidation();
		baseClause = eBaseClause.DELETE;
		return sqlFilterClauses;
	}

	public SqlBaseClauses join(eJoinType joinType, String joinTableName) {

		return join(joinType, joinTableName, null, null, null);
	}

	public SqlBaseClauses join(eJoinType joinType, String joinTableName, String as) {

		return join(joinType, joinTableName, as, null, null);
	}

	public SqlBaseClauses join(eJoinType joinType, String joinTableName, String as, String onColumnName1,
							   String onColumnName2) {
		additionalJoins.append(joinType).append(" ").append(joinTableName);
		if (as != null) {
			additionalJoins.append(" AS ").append(as);
		}
		if (onColumnName1 != null && onColumnName2 != null) {
			additionalJoins.append(String.format(" ON %s = %s ", onColumnName1, onColumnName2));
		}
		return this;
	}

	//	JOIN dbo.tbCustomersAddresses AS ca ON cust.mainAddress = ca.customersAddressID
//	JOIN dbo.tbCustomersContactPersons AS cp ON cust.mainContactPerson = cp.customersContactPersonID
	private void removeLastDelimiterFromStringBuilder(StringBuilder clauseBuilder) {
		if (clauseBuilder.length() >= parameterDelimiter.length())
			clauseBuilder.delete(clauseBuilder.length() - parameterDelimiter.length(), clauseBuilder.length());
	}

	private void baseClauseDuplicateValidation() {
		if (baseClause != null)
			throw new RuntimeException("Cant select 2 clauses for same query");
	}
}
