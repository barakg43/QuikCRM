package com.quik.server.sql;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import com.microsoft.sqlserver.jdbc.SQLServerConnectionPoolDataSource;
import com.microsoft.sqlserver.jdbc.SQLServerDataSource;
import com.quik.server.ServerConstants;
import org.springframework.context.annotation.Bean;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;
import java.io.FileReader;
import java.io.IOException;
import java.sql.*;
import java.sql.Types;
public class SqlClient {

    private final SqlConnectionManger sqlConnectionManger;
    private final Logger sqlClientLogger;
    private Connection sqlConnection;

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
            sqlConnectionManger.startSqlConnection();
            sqlClientLogger.info("Connection to sql server: "+sqlConnectionManger.getServerConfigDetails());
            sqlConnection=sqlConnectionManger.getSqlConnection();
            sqlClientLogger.info("Connection to sql server successfully.");
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }


    }
}
