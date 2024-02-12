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


	public <T> SqlFilterClauses select(Class<T> resultClass) {
		baseClauseDuplicateValidation();
		baseClause = eBaseClause.SELECT;
		buildClauseParameters(resultClass,
				(currentValue, columnName) -> additionalParameters.append(columnName).append(parameterDelimiter));
		removeLastDelimiterFromStringBuilder(additionalParameters);
		return sqlFilterClauses;
	}

	private void buildInsetClause(String outputColumn, StringBuilder columnNamesParameters,
								  StringBuilder valuesParameters) {
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

	}

	public SqlFilterClauses insert(Object newObjectRecord, String outputColumn) {
		baseClauseDuplicateValidation();
		baseClause = eBaseClause.INSERT;
		StringBuilder columnNamesParameters = new StringBuilder();
		StringBuilder valuesParameters = new StringBuilder();

		buildClauseParameters(newObjectRecord, (currentValue, columnName) -> {
					columnNamesParameters.append(columnName).append(parameterDelimiter);
					String value = String.format(currentValue.getClass().equals(String.class) ? "N'%s'" : "%s",
							currentValue);
					valuesParameters.append(value).append(parameterDelimiter);
				}
		);

		buildInsetClause(outputColumn, columnNamesParameters, valuesParameters);
		return sqlFilterClauses;
	}

	public SqlFilterClauses update(Object updatedObjectRecord) {
		baseClauseDuplicateValidation();
		baseClause = eBaseClause.UPDATE;
		buildClauseParameters(updatedObjectRecord, (currentValue, columnName) -> {
					String value = String.format(currentValue.getClass().equals(String.class) ? "N'%s'" : "%s",
							currentValue);
					additionalParameters.append(columnName).append(" = ").append(value).append(parameterDelimiter);
				}
		);
//		System.out.println(additionalParameters);
		removeLastDelimiterFromStringBuilder(additionalParameters);
		return sqlFilterClauses;
	}

	private void buildClauseParameters(Object objectRecord, BiFunction<Object, String> columnParameterBuilder) {
		Object currentValue;

		Method[] methods = objectRecord.getClass().getDeclaredMethods();
		for (Method method : methods) {
			try {
				if (!method.getName().equals("equals") && !method.getName().equals("hashCode") && !method.getName().equals("toString")) {
					currentValue = method.invoke(objectRecord);
					if (currentValue != null) {
						columnParameterBuilder.apply(currentValue, method.getName());
					}
				}
			} catch (IllegalAccessException | InvocationTargetException e) {
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


	@Deprecated
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
		return sqlFilterClauses;
	}


	@Deprecated
	public SqlFilterClauses select(String... columnNames) {
		baseClauseDuplicateValidation();
		baseClause = eBaseClause.SELECT;

		for (String columnName : columnNames) {
			additionalParameters.append(columnName).append(parameterDelimiter);
		}
		removeLastDelimiterFromStringBuilder(additionalParameters);
		return sqlFilterClauses;
	}

	@Deprecated
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
		buildInsetClause(outputColumn, columnNamesParameters, valuesParameters);
		return sqlFilterClauses;
	}
}
