package main.server.sql.bulider.component;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

public class SqlBaseClauses {
	protected final StringBuilder additionalParameters = new StringBuilder();
	protected final StringBuilder additionalJoins = new StringBuilder();
	private final String parameterDelimiter = ", ";
	private final SqlFilterClauses sqlFilterClauses;
	protected eBaseClause baseClause = null;
	private String outputClause = null;

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


	public SqlFilterClauses insert(Object newObject, String outputColumn, String... selectedFieldNames) {
		baseClauseDuplicateValidation();
		baseClause = eBaseClause.INSERT;
		StringBuilder columnNamesParameters = new StringBuilder();
		StringBuilder valuesParameters = new StringBuilder();
		String value;

		Object currentValue;
		for (String field : selectedFieldNames) {

			try {
				PropertyDescriptor pd = new PropertyDescriptor(field, newObject.getClass());
				Method getter = pd.getReadMethod();
				currentValue = getter.invoke(newObject);
				if (currentValue != null) {
					columnNamesParameters.append(field).append(parameterDelimiter);
					value = String.format(currentValue.getClass().equals(String.class) ? "N'%s'" : "%s",
							currentValue);
					valuesParameters.append(value).append(parameterDelimiter);
				}
			} catch (IntrospectionException | IllegalAccessException | InvocationTargetException e) {
				throw new RuntimeException(e);
			}

		}
		removeLastDelimiterFromStringBuilder(columnNamesParameters);
		removeLastDelimiterFromStringBuilder(valuesParameters);
		columnNamesParameters.append(")");
		valuesParameters.append(")");
		outputClause = outputColumn;
		additionalParameters.append(columnNamesParameters);
		if (outputColumn != null) {
			additionalParameters.append(String.format("\n\t\tOUTPUT INSERTED.%s", outputColumn));
		}
		additionalParameters.append("\n\t\tVALUES (").append(valuesParameters);
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
	public SqlFilterClauses update(Object updatedObject, String... selectedFieldNames) {
		baseClauseDuplicateValidation();
		baseClause = eBaseClause.UPDATE;
		String value;
		Object currentValue;
		for (String field : selectedFieldNames) {

			try {
				PropertyDescriptor pd = new PropertyDescriptor(field, updatedObject.getClass());
				Method getter = pd.getReadMethod();
				currentValue = getter.invoke(updatedObject);
				if (currentValue != null) {
					value = String.format(currentValue.getClass().equals(String.class) ? "N'%s'" : "%s",
							currentValue);
					additionalParameters.append(field).append(" = ").append(value).append(parameterDelimiter);
				}
			} catch (IntrospectionException | IllegalAccessException | InvocationTargetException e) {
				throw new RuntimeException(e);
			}

		}

//
//		for (Map.Entry<String, Object> columnEntry : columnValues.entrySet()) {
//			System.out.print(columnEntry);
//			if (columnEntry.getValue() != null) {
//				System.out.println(" :entered!");
//				value = String.format(columnEntry.getValue().getClass().equals(String.class) ? "'%s'" : "%s",
//						columnEntry.getValue());
//				additionalParameters.append(columnEntry.getKey()).append(" = ").append(value).append
//				(parameterDelimiter);
//			}
//
//		}
		System.out.println(additionalParameters);
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

	private Map<String, Object> convertUsingReflection(Object object) throws IllegalAccessException {
		Map<String, Object> map = new HashMap<>();
		Field[] fields = object.getClass().getDeclaredFields();

		for (Field field : fields) {
			field.setAccessible(true);
			map.put(field.getName(), field.get(object));
		}

		return map;
	}

	private void baseClauseDuplicateValidation() {
		if (baseClause != null)
			throw new RuntimeException("Cant select 2 clauses for same query");
	}
}
