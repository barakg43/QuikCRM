package com.quik.server.sql.function;

import com.quik.server.ServerConstants;
import com.quik.server.http.TaskRecord;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.jdbc.core.*;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.quik.server.sql.function.SqlFunctionExecutor.SCALAR_VALUE_SQL_QUERY_FORMAT;
import static com.quik.server.sql.function.SqlFunctionExecutor.TABLE_VALUE_SQL_QUERY_FORMAT;


public class SqlFunctionManager {

   private final SqlFunction<String> GET_CUSTOMER_SHORTNAME_BY_ID =new SqlFunction<>("fncCustShortNameForCustID","@CustID smallint",String.class);
    private final SqlFunction<String> GET_SUPPLIER_NAME_BY_ID=new SqlFunction<>("fncSupplierNameForSupplierID","@SupplierID smallint",String.class);
    private final SqlFunction<TaskRecord> GET_CLOSED_TASK_FOR_CUSTOMER = new SqlFunction<>("fncCustomersCloseTasksForID","@CustID smallint",TaskRecord.class);

    private final DataSource sqlDatabaseConfig;
    private final Map<String,SqlFunctionExecutor> functionExecutorMap;

    private final Logger sqlClientLogger;
    private SqlFunctionExecutor sqlFunctionExecutor;
//    SimpleJdbcCall JdbcDriverCaller;
    JdbcTemplate jdbcTemplate;
//    NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    public SqlFunctionManager(DataSource sqlDatabaseConfig) {
        this.sqlDatabaseConfig = sqlDatabaseConfig;
        this.functionExecutorMap = new HashMap<>();
        sqlClientLogger= LogManager.getLogger(ServerConstants.SQL_CLIENT_LOGGER_NAME);
//        JdbcDriverCaller=new SimpleJdbcCall(sqlDatabaseConfig).withFunctionName("fncSupplierNameForSupplierID");
        jdbcTemplate=new JdbcTemplate(sqlDatabaseConfig);
        sqlFunctionExecutor=new SqlFunctionExecutor(sqlDatabaseConfig);
//       namedParameterJdbcTemplate=new NamedParameterJdbcTemplate(sqlDatabaseConfig);

    }


    public String getCostumerNameByID(int id){
        return sqlFunctionExecutor.executeScalarValueFunction(GET_CUSTOMER_SHORTNAME_BY_ID,id);
//        String functionName=GET_CUSTOMER_SHORTNAME_BY_ID.toString();
//        sqlClientLogger.info(String.format("%s:find costumer name by his id [%d]",functionName,id));
//        SqlFunctionExecutor<String> functionExtractor;
//        if(!functionExecutorMap.containsKey(functionName)){
//            functionExtractor=createNewFunctionExecutor(functionName);
//            functionExecutorMap.put(functionName,functionExtractor);
//        }else{
//            functionExtractor = (SqlFunctionExecutor<String>) functionExecutorMap.get(functionName);
//        }
//
//        return functionExtractor.execute(id);

    }


    public String getSupplierNameByID(int id){
         return sqlFunctionExecutor.executeScalarValueFunction(GET_SUPPLIER_NAME_BY_ID,id);
//        String functionName=GET_SUPPLIER_NAME_BY_ID.toString();
//        List<TaskRecord> ts=jdbcTemplate.query("SELECT * FROM dbo.fncCustomersCloseTasksForID(?)",
//                new BeanPropertyRowMapper<>(TaskRecord.class),id);

//        sqlClientLogger.info(String.format("%s:find supplier name by his id [%d]",functionName,id));

//        if(!functionExecutorMap.containsKey(functionName)){
//            functionExtractor=createNewFunctionExecutor(functionName);
//            functionExecutorMap.put(functionName,functionExtractor);
//        }else{
//            functionExtractor = (SqlFunctionExecutor<String>) functionExecutorMap.get(functionName);
//        }


    }

    public List<TaskRecord> getClosedTaskForCustomer(int id) {
        return sqlFunctionExecutor.executeTableValueFunction(GET_CLOSED_TASK_FOR_CUSTOMER,id);
//        String functionName=GET_CLOSED_TASK_FOR_CUSTOMER.toString();
//        SimpleJdbcCall simpleJdbcCall  =new SimpleJdbcCall(sqlDatabaseConfig)
//                .withFunctionName("fncCustomersCloseTasksForID") // Replace with the name of your SQL function
//                .returningResultSet("closed-task", new SingleColumnRowMapper<TaskRecord>());
////

    }


}
