package com.quik.server.sql.function;

import org.springframework.core.GenericTypeResolver;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;

import javax.sql.DataSource;

public class SqlFunctionExecutor<T> {

    private SimpleJdbcCall JdbcDriverCaller;
    private final String functionName;
    private final Class<T> returnType;

    public SqlFunctionExecutor( String functionName) {
        returnType = (Class<T>) GenericTypeResolver.resolveTypeArgument(getClass(), SqlFunctionExecutor.class);
        this.functionName = functionName;
    }

    public void initializeSqlConfig(DataSource databaseSource){
        JdbcDriverCaller=new SimpleJdbcCall(databaseSource).withFunctionName(functionName);
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
