package main.server.sql;

import main.server.ServerConstants;
import main.server.http.TaskRecord;
import main.server.logger.ServerLogManager;
import main.server.sql.function.SqlFunctionManager;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public class SqlClient {

    private final SqlConnectionManger sqlConnectionManger;
    private final Logger sqlClientLogger;
    private final String sqlConfigurationYamlFilePath;
    private final ServerLogManager logManager;
    private Connection sqlConnection;
    private SqlFunctionManager sqlFunctionManager;

    //    public SqlClient(SqlConfiguration sqlServerConfiguration){
//        sqlConnectionManger=new SqlConnectionManger(sqlServerConfiguration);
//        sqlClientLogger=LogManager.getLogger(ServerConstants.SQL_CLIENT_LOGGER_NAME);
//    }
    public SqlClient(String sqlConfigurationYamlFilePath, ServerLogManager logManager) {
        sqlConnectionManger = new SqlConnectionManger(sqlConfigurationYamlFilePath);
        this.sqlConfigurationYamlFilePath = sqlConfigurationYamlFilePath;
        this.logManager = logManager;
        sqlClientLogger = LogManager.getLogger(ServerConstants.SQL_CLIENT_LOGGER_NAME);
    }

    public void createSqlConnection() {
        sqlClientLogger.debug(String.format("Opening sql yaml file configuration at [%s]", sqlConfigurationYamlFilePath));
        try {
            sqlConnectionManger.initializeSqlConnectionConfig();
            sqlClientLogger.info("open connection to sql server: " + sqlConnectionManger.getServerConfigDetails());
            sqlConnectionManger.getSqlConnectionConfig().getConnection().close();//test connection to sql server and close it
            sqlFunctionManager = new SqlFunctionManager(sqlConnectionManger.getSqlConnectionConfig());
            sqlClientLogger.info("Connection to sql server successfully.");
        } catch (SQLException e) {
            sqlClientLogger.error(e.getMessage());
            throw new RuntimeException(e);
        } catch (IOException e) {
            sqlClientLogger.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public String getCostumerNameByID(int id) {
        return sqlFunctionManager.getCostumerNameByID(id);
    }

    public String getSupplierNameByID(int id) {
        return sqlFunctionManager.getSupplierNameByID(id);
    }

    public List<TaskRecord> getClosedTaskForCustomer(int id) {
        return sqlFunctionManager.getClosedTaskForCustomer(id);
    }

}
