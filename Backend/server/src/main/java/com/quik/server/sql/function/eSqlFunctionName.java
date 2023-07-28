package com.quik.server.sql.function;

public enum eSqlFunctionName {

    GET_CUSTOMER_SHORTNAME_BY_ID("fncCustShortNameForCustID","@CustID smallint"),
    GET_SUPPLIER_NAME_BY_ID("fncSupplierNameForSupplierID","@SupplierID smallint"),
    GET_CLOSED_TASK_FOR_CUSTOMER("fncCustomersCloseTasksForID","@CustID smallint") ;


    private final String functionName;
    private final String argumentString;

    eSqlFunctionName(String functionName,String argumentString) {
        this.functionName = functionName;
        this.argumentString = argumentString;
    }

    public String getArgumentString() {
        return argumentString;
    }

    @Override
    public String toString() {
        return functionName;
    }
}
