package com.quik.server.sql.function;

import com.quik.server.ServerConstants;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

import static com.quik.server.sql.function.eSqlFunctionName.GET_CUSTOMER_SHORTNAME_BY_ID;
import static com.quik.server.sql.function.eSqlFunctionName.GET_SUPPLIER_NAME_BY_ID;

public class SqlFunctionManager {


    private final DataSource sqlDatabaseConfig;
    private final Map<String,SqlFunctionExecutor<?>> functionExecutorMap;
    private final Logger sqlClientLogger;

    public SqlFunctionManager(DataSource sqlDatabaseConfig) {
        this.sqlDatabaseConfig = sqlDatabaseConfig;
        this.functionExecutorMap = new HashMap<>();
        sqlClientLogger= LogManager.getLogger(ServerConstants.SQL_CLIENT_LOGGER_NAME);
    }

     private <V> SqlFunctionExecutor<V> createNewFunctionExecutor(String functionName){
        SqlFunctionExecutor<V> functionExecutor= new SqlFunctionExecutor<V>(functionName);

        functionExecutor.initializeSqlConfig(sqlDatabaseConfig);

        return functionExecutor;
    }
    public String getCostumerNameByID(int id){
        String functionName=GET_CUSTOMER_SHORTNAME_BY_ID.toString();
        sqlClientLogger.info(String.format("%s:find costumer name by his id [%d]",functionName,id));
        SqlFunctionExecutor<String> functionExtractor;
        if(!functionExecutorMap.containsKey(functionName)){
            functionExtractor=createNewFunctionExecutor(functionName);
            functionExecutorMap.put(functionName,functionExtractor);
        }else{
            functionExtractor = (SqlFunctionExecutor<String>) functionExecutorMap.get(functionName);
        }

        return functionExtractor.execute(id);
    }

    public String getSupplierNameByID(int id){
        String functionName=GET_SUPPLIER_NAME_BY_ID.toString();
        SqlFunctionExecutor<String> functionExtractor;
        sqlClientLogger.info(String.format("%s:find supplier name by his id [%d]",functionName,id));
        if(!functionExecutorMap.containsKey(functionName)){
            functionExtractor=createNewFunctionExecutor(functionName);
            functionExecutorMap.put(functionName,functionExtractor);
        }else{
            functionExtractor = (SqlFunctionExecutor<String>) functionExecutorMap.get(functionName);
        }

        return functionExtractor.execute(id);
    }
}
