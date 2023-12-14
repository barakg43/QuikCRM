package main.server.sql.function;

import main.server.ServerConstants;
import main.server.http.json.dto.TaskRecord;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class SqlFunctionManager {

    private final SqlFunction<String> GET_CUSTOMER_SHORTNAME_BY_ID = new SqlFunction<>("fncCustShortNameForCustID", "@CustID smallint", String.class);
    private final SqlFunction<String> GET_SUPPLIER_NAME_BY_ID = new SqlFunction<>("fncSupplierNameForSupplierID", "@SupplierID smallint", String.class);
    private final SqlFunction<TaskRecord> GET_CLOSED_TASK_FOR_CUSTOMER = new SqlFunction<>("fncCustomersCloseTasksForID", "@CustID smallint", TaskRecord.class);

    private final DataSource sqlDatabaseConfig;
    private final Map<String, SqlFunctionExecutor> functionExecutorMap;

    private final Logger sqlClientLogger;
    private final SqlFunctionExecutor sqlFunctionExecutor;
    JdbcTemplate jdbcTemplate;

    public SqlFunctionManager(DataSource sqlDatabaseConfig) {
        this.sqlDatabaseConfig = sqlDatabaseConfig;
        this.functionExecutorMap = new HashMap<>();
        sqlClientLogger = LogManager.getLogger(ServerConstants.SQL_CLIENT_LOGGER_NAME);
        sqlFunctionExecutor = new SqlFunctionExecutor(sqlDatabaseConfig);
    }


    public String getCostumerNameByID(int id) {
        return sqlFunctionExecutor.executeScalarValueFunction(GET_CUSTOMER_SHORTNAME_BY_ID, id);
    }


    public String getSupplierNameByID(int id) {
        return sqlFunctionExecutor.executeScalarValueFunction(GET_SUPPLIER_NAME_BY_ID, id);
    }

    public List<TaskRecord> getClosedTaskForCustomer(int id) {
        return sqlFunctionExecutor.executeTableValueFunction(GET_CLOSED_TASK_FOR_CUSTOMER, id);

    }


}
