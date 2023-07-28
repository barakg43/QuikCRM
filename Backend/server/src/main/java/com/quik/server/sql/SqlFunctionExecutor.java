package com.quik.server.sql;

import org.springframework.core.GenericTypeResolver;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;

import javax.sql.DataSource;
import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;

public class SqlFunctionExecutor<T> {

    private SimpleJdbcCall JdbcDriverCaller;

    private final String functionName;
    private final Class<T> returnType;

    public SqlFunctionExecutor(DataSource dataSource, String functionName, List<String, Type> parameterType) {
        JdbcDriverCaller=new SimpleJdbcCall(dataSource).withFunctionName(functionName);
        returnType = (Class<T>) GenericTypeResolver.resolveTypeArgument(getClass(), SqlFunctionExecutor.class);
        this.functionName = functionName;
    }

    public T execute(Object... functionArguments){
        return JdbcDriverCaller.executeFunction(returnType,functionArguments);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        SqlFunctionExecutor<?> that = (SqlFunctionExecutor<?>) o;
        return functionName.equals(that.functionName);
    }

    @Override
    public int hashCode() {
        return functionName.hashCode();
    }
}
