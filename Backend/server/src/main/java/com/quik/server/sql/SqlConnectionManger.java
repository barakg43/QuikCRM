package com.quik.server.sql;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import com.microsoft.sqlserver.jdbc.SQLServerConnectionPoolDataSource;
import com.microsoft.sqlserver.jdbc.SQLServerDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;

import javax.sql.DataSource;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;

public class SqlConnectionManger {
    private DataSource dataSourceConfig;
    private SqlConfiguration sqlConnectionConfiguration;
    private Connection sqlConnection;
    private final String sqlConfigurationYamlFilePath;
    private SimpleJdbcCall simpleJdbcCall;

    public SqlConnectionManger(String sqlConfigurationYamlFilePath) {
        this.sqlConfigurationYamlFilePath=sqlConfigurationYamlFilePath;
    }
    public void startSqlConnection() throws SQLException, IOException {
        sqlConnectionConfiguration=createSqlConfigurationFromFile(sqlConfigurationYamlFilePath);
        dataSourceConfig=createDataSource(sqlConnectionConfiguration);
        simpleJdbcCall=new SimpleJdbcCall(dataSourceConfig);
//        simpleJdbcCall.withFunctionName();
        simpleJdbcCall.
        sqlConnection=dataSourceConfig.getConnection();
    }
    @Bean
    private SqlConfiguration createSqlConfigurationFromFile(String filePath) throws IOException {
        ObjectMapper yamlMapper = new ObjectMapper(new YAMLFactory());
        SqlConfiguration sqlConfiguration = null;
        FileReader fileReader;

        fileReader = new FileReader(filePath);
        sqlConfiguration = yamlMapper.readValue(fileReader, SqlConfiguration.class);

        return sqlConfiguration;
    }
    @Bean
    private DataSource createDataSource(SqlConfiguration sqlServerConfiguration) {
        SQLServerDataSource msSqlDataSource=new SQLServerDataSource();
//        SQLServerConnectionPoolDataSource msSqlDataSource=new SQLServerConnectionPoolDataSource();
        msSqlDataSource.setServerName(sqlServerConfiguration.getServerName());
        msSqlDataSource.setPortNumber(sqlServerConfiguration.getPort());
        msSqlDataSource.setUser(sqlServerConfiguration.getUsername());
        msSqlDataSource.setPassword(sqlServerConfiguration.getPassword());
        msSqlDataSource.setDatabaseName(sqlServerConfiguration.getDatabaseName());
        msSqlDataSource.setEncrypt("true");
        msSqlDataSource.setTrustServerCertificate(true);
        return msSqlDataSource;
    }
    public String getServerConfigDetails(){
        return sqlConnectionConfiguration.getServerConfigDetails();
    }
    public Connection getSqlConnection() {
        return sqlConnection;
    }
}
