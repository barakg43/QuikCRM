package com.quik.server.sql;

import java.lang.reflect.Type;

public class SqlFunctionParameter<T> {
    private String parameterName;
    private Type parameterType;
    private Object value;

    public SqlFunctionParameter(String parameterName, Type parameterType) {
        this.parameterName = parameterName;
        this.parameterType = parameterType;
    }
    public Object getValue() {
        return value;
    }
    public void setValue(Object value) {
        this.value = value;
    }
}
