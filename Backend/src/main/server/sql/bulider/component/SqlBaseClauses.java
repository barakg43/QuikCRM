package main.server.sql.bulider.component;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.*;

public class SqlBaseClauses {
	protected final StringBuilder additionalParameters = new StringBuilder();
	protected final StringBuilder additionalJoins = new StringBuilder();
	private final String parameterDelimiter = ", ";
	private final SqlFilterClauses sqlFilterClauses;
	protected eBaseClause baseClause = null;

	public SqlBaseClauses(SqlFilterClauses sqlFilterClauses) {
		this.sqlFilterClauses = sqlFilterClauses;
	}


	public <T> SqlFilterClauses select(Class<T> resultClass, String... columnNamesToExclude) {
		baseClauseDuplicateValidation();
		baseClause = eBaseClause.SELECT;

		buildClauseParameters(null, resultClass,
				(currentValue, columnName) -> additionalParameters.append(columnName).append(parameterDelimiter),
				columnNamesToExclude);
		removeLastDelimiterFromStringBuilder(additionalParameters);
		return sqlFilterClauses;
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

	private void buildInsetClause(String outputColumn, StringBuilder columnNamesParameters,
								  StringBuilder valuesParameters) {
		removeLastDelimiterFromStringBuilder(columnNamesParameters);
		removeLastDelimiterFromStringBuilder(valuesParameters);
		columnNamesParameters.append(")");
		valuesParameters.append(")");
		additionalParameters.append(columnNamesParameters);
		if (outputColumn != null) {
			additionalParameters.append(String.format("\n\t\tOUTPUT INSERTED.%s", outputColumn));
		}
		additionalParameters.append("\n\t\tVALUES (").append(valuesParameters);

	}

	public SqlFilterClauses insert(Object newObjectRecord, String outputColumn, String... columnNamesToExclude) {
		baseClauseDuplicateValidation();
		baseClause = eBaseClause.INSERT;
		StringBuilder columnNamesParameters = new StringBuilder();
		StringBuilder valuesParameters = new StringBuilder();

		buildClauseParameters(newObjectRecord, newObjectRecord.getClass(), (currentValue, columnName) -> {
					columnNamesParameters.append(columnName).append(parameterDelimiter);
					String value = String.format(currentValue.getClass().equals(String.class) ? "N'%s'" : "%s",
							currentValue);
					valuesParameters.append(value).append(parameterDelimiter);
				}, columnNamesToExclude
		);

		buildInsetClause(outputColumn, columnNamesParameters, valuesParameters);
		return sqlFilterClauses;
	}

	public SqlFilterClauses update(Object updatedObjectRecord, String... columnNamesToExclude) {
		baseClauseDuplicateValidation();
		baseClause = eBaseClause.UPDATE;
		buildClauseParameters(updatedObjectRecord, updatedObjectRecord.getClass(), (currentValue, columnName) -> {
					String value = String.format(currentValue.getClass().equals(String.class) ? "N'%s'" : "%s",
							currentValue);
					additionalParameters.append(columnName).append(" = ").append(value).append(parameterDelimiter);
				}, columnNamesToExclude
		);
//		System.out.println(additionalParameters);
		removeLastDelimiterFromStringBuilder(additionalParameters);
		return sqlFilterClauses;
	}

	private <T> void buildClauseParameters(Object recordObject, Class<T> recordClass,
										   BiFunction<Object, String> columnParameterBuilder,
										   String... columnNamesToExclude) {
		Object currentValue;
		Set<String> columnNamesToExcludeSet = new HashSet<>(List.of(columnNamesToExclude));
		Field[] fields = recordClass.getDeclaredFields();
		for (Field field : fields) {
			String columnName = field.getName();
			try {
				if (!columnNamesToExcludeSet.contains(columnName)) {
					if (recordObject == null) {
						columnParameterBuilder.apply(null, columnName);
					} else {
						Method method =
								recordClass.getMethod("get" + columnName.substring(0, 1).toUpperCase() + columnName.substring(1));
						currentValue = method.invoke(recordObject);
						if (currentValue != null) {
							columnParameterBuilder.apply(currentValue, columnName);
						}
					}
				}
			} catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
				throw new RuntimeException(e);
			}
		}
	}

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

	/**
	 * Removes the last instance of the parameterDelimiter from the StringBuilder clauseBuilder.
	 *
	 * @param clauseBuilder the StringBuilder to modify
	 */
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

//
//	@Deprecated
//	public SqlFilterClauses update(Object updatedObject, String selectedFieldNames) {
//		baseClauseDuplicateValidation();
//		baseClause = eBaseClause.UPDATE;
//		String value;
//		Object currentValue;
//		for (String field : selectedFieldNames) {
//
//			try {
//				PropertyDescriptor pd = new PropertyDescriptor(field, updatedObject.getClass());
//				Method getter = pd.getReadMethod();
//				currentValue = getter.invoke(updatedObject);
//				if (currentValue != null) {
//					value = String.format(currentValue.getClass().equals(String.class) ? "N'%s'" : "%s",
//							currentValue);
//					additionalParameters.append(field).append(" = ").append(value).append(parameterDelimiter);
//				}
//			} catch (IntrospectionException | IllegalAccessException | InvocationTargetException e) {
//				throw new RuntimeException(e);
//			}
//
//		}
//		return sqlFilterClauses;
//	}
//
//

//
//	@Deprecated
//	public SqlFilterClauses insert(Object newObject, String outputColumn, String... selectedFieldNames) {
//		baseClauseDuplicateValidation();
//		baseClause = eBaseClause.INSERT;
//		StringBuilder columnNamesParameters = new StringBuilder();
//		StringBuilder valuesParameters = new StringBuilder();
//		String value;
//
//		Object currentValue;
//		for (String field : selectedFieldNames) {
//
//			try {
//				PropertyDescriptor pd = new PropertyDescriptor(field, newObject.getClass());
//				Method getter = pd.getReadMethod();
//				currentValue = getter.invoke(newObject);
//				if (currentValue != null) {
//					columnNamesParameters.append(field).append(parameterDelimiter);
//					value = String.format(currentValue.getClass().equals(String.class) ? "N'%s'" : "%s",
//							currentValue);
//					valuesParameters.append(value).append(parameterDelimiter);
//				}
//			} catch (IntrospectionException | IllegalAccessException | InvocationTargetException e) {
//				throw new RuntimeException(e);
//			}
//
//		}
//		buildInsetClause(outputColumn, columnNamesParameters, valuesParameters);
//		return sqlFilterClauses;
//	}
}
