package com.quik.server.sql.function;

import com.quik.server.ServerConstants;
import com.quik.server.http.TaskRecord;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.jdbc.core.*;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.quik.server.sql.function.eSqlFunctionName.*;

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

    public List<TaskRecord> getClosedTaskForCustomer(int id) {
        String functionName=GET_CLOSED_TASK_FOR_CUSTOMER.toString();
        SimpleJdbcCall simpleJdbcCall  =new SimpleJdbcCall(sqlDatabaseConfig)
                .withFunctionName("fncCustomersCloseTasksForID") // Replace with the name of your SQL function
                .returningResultSet("closed-task", new SingleColumnRowMapper<TaskRecord>());
//                        (RowMapper<TaskRecord>) (rs, rowNum) -> new TaskRecord(
//                rs.getInt("TaskID"),
//                rs.getInt("CustomerID"),
//                rs.getString("TaskShortDescription"),
//                rs.getDate("DateOfTaskOpen"),
//                rs.getInt("PerformanceStatusID"),
//                rs.getDate("DateOfTaskClose"),
//                rs.getString("TaskOpenRemarks"),
//                rs.getString("PerformancesStatus"),
//                rs.getBoolean("Checked")),.returningResultSet("actors",

        SqlFunctionExecutor<List<TaskRecord>> functionExtractor;
//        sqlClientLogger.info(String.format("%s:find closed task for customer [%d]",functionName,id));
//        if(!functionExecutorMap.containsKey(functionName)){
//            functionExtractor=createNewFunctionExecutor(functionName);
//            functionExecutorMap.put(functionName,functionExtractor);
//        }else{
//            functionExtractor = (SqlFunctionExecutor<List<TaskRecord>>) functionExecutorMap.get(functionName);
//        }
        Map m =simpleJdbcCall.executeFunction(Map.class,id);
        List<TaskRecord> list =(List) m.get("closed-task");
        return list;
//        return (List<TaskRecord>)simpleJdbcCall.executeObject(RowMapper.class, id);

    }
    public List<TaskRecord> getClosedTaskForCustomer2(Object id) {

        NamedParameterJdbcTemplate namedParameterJdbcTemplate=new NamedParameterJdbcTemplate(sqlDatabaseConfig);

        List<TaskRecord> ts=namedParameterJdbcTemplate.query("SELECT * FROM fncCustomersCloseTasksForID(:cust_id)",
                new MapSqlParameterSource().addValue("cust_id",id),
                new BeanPropertyRowMapper(TaskRecord.class));
//        String functionName=GET_CLOSED_TASK_FOR_CUSTOMER.toString();
//        SimpleJdbcCall simpleJdbcCall  =new SimpleJdbcCall(sqlDatabaseConfig)
//                .withFunctionName("fncCustomersCloseTasksForID") // Replace with the name of your SQL function
//                .returningResultSet("closed-task", new SingleColumnRowMapper<TaskRecord>());
////                        (RowMapper<TaskRecord>) (rs, rowNum) -> new TaskRecord(
////                rs.getInt("TaskID"),
////                rs.getInt("CustomerID"),
////                rs.getString("TaskShortDescription"),
////                rs.getDate("DateOfTaskOpen"),
////                rs.getInt("PerformanceStatusID"),
////                rs.getDate("DateOfTaskClose"),
////                rs.getString("TaskOpenRemarks"),
////                rs.getString("PerformancesStatus"),
////                rs.getBoolean("Checked")),.returningResultSet("actors",
//
//        SqlFunctionExecutor<List<TaskRecord>> functionExtractor;
////        sqlClientLogger.info(String.format("%s:find closed task for customer [%d]",functionName,id));
////        if(!functionExecutorMap.containsKey(functionName)){
////            functionExtractor=createNewFunctionExecutor(functionName);
////            functionExecutorMap.put(functionName,functionExtractor);
////        }else{
////            functionExtractor = (SqlFunctionExecutor<List<TaskRecord>>) functionExecutorMap.get(functionName);
////        }
//        Map m =simpleJdbcCall.executeFunction(Map.class,id);
//        List<TaskRecord> list =(List) m.get("closed-task");
//        return list;
////        return (List<TaskRecord>)simpleJdbcCall.executeObject(RowMapper.class, id);
            return ts;
    }
}
