package main.server.sql;

import jakarta.annotation.PostConstruct;
import main.server.ServerConstants;
import main.server.http.json.dto.TaskRecord;
import main.server.logger.ServerLogManager;
import main.server.sql.function.SqlFunctionExecutor;
import main.server.sql.function.SqlFunctionManager;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import static main.server.ServerConstants.SQL_YAML_CONFIG_LOCATION;

@Service
public class SqlClient {

    private final SqlConnectionManger sqlConnectionManger;
    private final Logger sqlClientLogger;
    private final String sqlConfigurationYamlFilePath=SQL_YAML_CONFIG_LOCATION;
    private final ServerLogManager logManager;
    private Connection sqlConnection;

    private SqlFunctionExecutor sqlFunctionExecutor;

    //    public SqlClient(SqlConfiguration sqlServerConfiguration){
//        sqlConnectionManger=new SqlConnectionManger(sqlServerConfiguration);
//        sqlClientLogger=LogManager.getLogger(ServerConstants.SQL_CLIENT_LOGGER_NAME);
//    }
    public SqlClient( ServerLogManager logManager) {
        System.out.println("SqlClient ctor");
        sqlConnectionManger = new SqlConnectionManger(sqlConfigurationYamlFilePath);
        this.logManager = logManager;
        sqlClientLogger = LogManager.getLogger(ServerConstants.SQL_CLIENT_LOGGER_NAME);
    }
    @PostConstruct
    public void createSqlConnection() {
        System.out.println("createSqlConnection");
        sqlClientLogger.debug(String.format("Opening sql yaml file configuration at [%s]", sqlConfigurationYamlFilePath));
        try {
            sqlConnectionManger.initializeSqlConnectionConfig();
            sqlClientLogger.info("Opening connection to sql server: " + sqlConnectionManger.getServerConfigDetails());
            sqlConnectionManger.getSqlConnectionConfig().getConnection().close();//test connection to sql server and close it
            sqlFunctionExecutor = new SqlFunctionExecutor(sqlConnectionManger.getSqlConnectionConfig());
            sqlClientLogger.info("Connection to sql server successfully.");
        } catch (SQLException | IOException e) {
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
