package com.quik.server.sql.function;

public class SqlFunction<T> {
    private final String sqlFunctionQuery;
    private final String argumentString;
    private final Class<T> returnType;

    //    public SqlFunction(String sqlFunctionQuery, String argumentString) {
//
//        this.sqlFunctionQuery = sqlFunctionQuery;
//        this.argumentString = argumentString;
//        this.returnType = (Class<T>) new TypeToken<T>() {}.get();
//        System.out.println(returnType);
//    }
    public SqlFunction(String sqlFunctionQuery, String argumentString, Class<T> returnTye) {

        this.sqlFunctionQuery = sqlFunctionQuery;
        this.argumentString = argumentString;
        this.returnType = returnTye;
    }

    public String getSqlFunctionQuery() {
        return sqlFunctionQuery;
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
