package com.quik.server.sql;

import com.quik.server.ServerConstants;
import com.quik.server.sql.function.SqlFunctionManager;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;

public class SqlClient {

    private final SqlConnectionManger sqlConnectionManger;
    private final Logger sqlClientLogger;
    private Connection sqlConnection;
    private SqlFunctionManager sqlFunctionManager;
    private final String sqlConfigurationYamlFilePath;

//    public SqlClient(SqlConfiguration sqlServerConfiguration){
//        sqlConnectionManger=new SqlConnectionManger(sqlServerConfiguration);
//        sqlClientLogger=LogManager.getLogger(ServerConstants.SQL_CLIENT_LOGGER_NAME);
//    }
    public SqlClient(String sqlConfigurationYamlFilePath) {
        sqlConnectionManger=new SqlConnectionManger(sqlConfigurationYamlFilePath);
        this.sqlConfigurationYamlFilePath=sqlConfigurationYamlFilePath;
        sqlClientLogger=LogManager.getLogger(ServerConstants.SQL_CLIENT_LOGGER_NAME);
    }
    public void createSqlConnection() {
        sqlClientLogger.debug(String.format("Opening sql yaml file configuration at [%s]",sqlConfigurationYamlFilePath));
        try {
            sqlConnectionManger.initializeSqlConnectionConfig();
            sqlClientLogger.info("open connection to sql server: "+sqlConnectionManger.getServerConfigDetails());
            sqlConnectionManger.getSqlConnectionConfig().getConnection().close();//test connection to sql server and close it
            sqlFunctionManager=new SqlFunctionManager(sqlConnectionManger.getSqlConnectionConfig());
            sqlClientLogger.info("Connection to sql server successfully.");
        } catch (SQLException e) {
            sqlClientLogger.error(e.getMessage());
            throw new RuntimeException(e);
        } catch (IOException e) {
            sqlClientLogger.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }
    public String getCostumerNameByID(int id){
     return sqlFunctionManager.getCostumerNameByID(id);
    }

    public String getSupplierNameByID(int id){
        return sqlFunctionManager.getSupplierNameByID(id);
    }
}
