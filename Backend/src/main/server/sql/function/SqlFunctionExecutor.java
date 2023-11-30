package main.server.sql.function;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;
import java.util.List;

public class SqlFunctionExecutor {

    public static final String SCALAR_VALUE_SQL_QUERY_FORMAT = "SELECT dbo.%s(%s)";
    public static final String TABLE_VALUE_SQL_QUERY_FORMAT = "SELECT * FROM dbo.%s(%s)";
    private final JdbcTemplate jdbcTemplate;


    public SqlFunctionExecutor(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public <T> T executeScalarValueFunction(SqlFunction<T> functionObject, Object... functionArguments) {
        String sqlQuery = preparedSqlQueryString(functionObject, false, functionArguments.length);
        return jdbcTemplate.queryForObject(sqlQuery, functionObject.getReturnType(), functionArguments);
    }

    public <T> List<T> executeTableValueFunction(SqlFunction<T> functionObject, Object... functionArguments) {
        String sqlQuery = preparedSqlQueryString(functionObject, true, functionArguments.length);
        return jdbcTemplate.query(sqlQuery,
                new BeanPropertyRowMapper<>(functionObject.getReturnType()),
                functionArguments);
    }


    private <T> String preparedSqlQueryString(SqlFunction<T> functionObject, boolean isTableValueFunction, int argumentAmount) {
        StringBuilder argumentString = new StringBuilder();
        String query;
        if (argumentAmount > 0) {
            argumentString.append("?,".repeat(argumentAmount - 1));
            argumentString.append('?');
        }
        if (isTableValueFunction) {
            query = String.format(TABLE_VALUE_SQL_QUERY_FORMAT, functionObject.getSqlFunctionQuery(), argumentString);
        } else {
            query = String.format(SCALAR_VALUE_SQL_QUERY_FORMAT, functionObject.getSqlFunctionQuery(), argumentString);
        }

        return query;
    }


}
