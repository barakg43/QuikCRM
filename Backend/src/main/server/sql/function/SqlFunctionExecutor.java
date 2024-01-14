package main.server.sql.function;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;
import java.util.List;

public class SqlFunctionExecutor {

	public static final String SCALAR_VALUE_SQL_QUERY_FORMAT = "SELECT dbo.%s(%s)";
	public static final String TABLE_VALUE_SQL_QUERY_FORMAT = "SELECT * FROM dbo.%s(%s)";


	private JdbcTemplate jdbcTemplate;

	public SqlFunctionExecutor() {
		System.out.println("SqlFunctionExecutor ctor");
	}

	public void initializeJdbcTemplate(DataSource dataSource) {
		System.out.println("initializeJdbcTemplate");
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}

	@Deprecated
	public <T> T executeScalarValueFunction(String storedFunctionQuery, Class<T> returnType,
											Object... functionArguments) {
		String sqlQuery = preparedSqlQueryString(storedFunctionQuery, false, functionArguments.length);
		return jdbcTemplate.queryForObject(sqlQuery, returnType, functionArguments);
	}

	@Deprecated
	public <T> List<T> executeTableValueFunction(String storedFunctionQuery, Class<T> returnType,
												 Object... functionArguments) {
		String sqlQuery = preparedSqlQueryString(storedFunctionQuery, true, functionArguments.length);
		return jdbcTemplate.query(sqlQuery,
				new BeanPropertyRowMapper<>(returnType),
				functionArguments);
	}

	public <T> T executeScalarValueQuery(String sqlQuery, Class<T> returnType) {
		return jdbcTemplate.queryForObject(sqlQuery, returnType);
	}

	public <T> List<T> executeTableValueQuery(String sqlQuery, Class<T> returnType) {
		return jdbcTemplate.query(sqlQuery,
				new BeanPropertyRowMapper<>(returnType));
	}


	private String preparedSqlQueryString(String storedFunctionQuery, boolean isTableValueFunction,
										  int argumentAmount) {
		StringBuilder argumentString = new StringBuilder();
		String query;
		if (argumentAmount > 0) {
			argumentString.append("?,".repeat(argumentAmount - 1));
			argumentString.append('?');
		}
		if (isTableValueFunction) {
			query = String.format(TABLE_VALUE_SQL_QUERY_FORMAT, storedFunctionQuery, argumentString);
		} else {
			query = String.format(SCALAR_VALUE_SQL_QUERY_FORMAT, storedFunctionQuery, argumentString);
		}

		return query;
	}


}
