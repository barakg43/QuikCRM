package com.quik.server.sql.function;

import com.quik.server.http.TaskRecord;
import com.quik.server.uilities.TypeToken;
import org.springframework.core.GenericTypeResolver;

import java.lang.reflect.Type;
import java.util.List;

public class SqlFunction<T>{
    private final String sqlFunctionQuery;
    private final String argumentString;
    private final Class<T> returnType;

    public String getSqlFunctionQuery() {
        return sqlFunctionQuery;
    }

//    public SqlFunction(String sqlFunctionQuery, String argumentString) {
//
//        this.sqlFunctionQuery = sqlFunctionQuery;
//        this.argumentString = argumentString;
//        this.returnType = (Class<T>) new TypeToken<T>() {}.get();
//        System.out.println(returnType);
//    }
    public SqlFunction(String sqlFunctionQuery, String argumentString,Class<T> returnTye) {

        this.sqlFunctionQuery = sqlFunctionQuery;
        this.argumentString = argumentString;
        this.returnType = returnTye;
    }

    public String getArgumentString() {
        return argumentString;
    }



    public Class<T> getReturnType() {
        return returnType;
    }

    @Override
    public String toString() {
        return sqlFunctionQuery;
    }
}
