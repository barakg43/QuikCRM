package main.server.sql;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import com.microsoft.sqlserver.jdbc.SQLServerDataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;

import javax.sql.DataSource;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;

import static main.server.ServerConstants.SQL_YAML_CONFIG_LOCATION;


@Configuration
public class SqlConnectionManger {
	private final String sqlConfigurationYamlFilePath = SQL_YAML_CONFIG_LOCATION;

	private DataSource dataSourceConfig;
	private SqlConfiguration sqlConnectionConfiguration;
	private Connection sqlConnection;
	private SimpleJdbcCall simpleJdbcCall;

	public SqlConnectionManger() {
	}

	public void initializeSqlConnectionConfig() throws SQLException, IOException {
		sqlConnectionConfiguration = createSqlConfigurationFromFile(sqlConfigurationYamlFilePath);
		dataSourceConfig = createDataSource(sqlConnectionConfiguration);


//        simpleJdbcCall=new SimpleJdbcCall(dataSourceConfig);
//        simpleJdbcCall.withFunctionName();
	}

	@Bean("sqlConfig")
	public SqlConfiguration createSqlConfigurationFromFile() throws IOException {
		ObjectMapper yamlMapper = new ObjectMapper(new YAMLFactory());
		SqlConfiguration sqlConfiguration;
		FileReader fileReader;

		fileReader = new FileReader(sqlConfigurationYamlFilePath);
		sqlConfiguration = yamlMapper.readValue(fileReader, SqlConfiguration.class);

		return sqlConfiguration;
	}

	@Bean
	public DataSource createDataSource(@Qualifier("sqlConfig") SqlConfiguration sqlServerConfiguration) {
		SQLServerDataSource msSqlDataSource = new SQLServerDataSource();
		msSqlDataSource.setServerName(sqlServerConfiguration.getServerName());
		msSqlDataSource.setPortNumber(sqlServerConfiguration.getPort());
		msSqlDataSource.setUser(sqlServerConfiguration.getUsername());
		msSqlDataSource.setPassword(sqlServerConfiguration.getPassword());
		msSqlDataSource.setDatabaseName(sqlServerConfiguration.getDatabaseName());
		msSqlDataSource.setEncrypt("true");
		msSqlDataSource.setTrustServerCertificate(true);

		return msSqlDataSource;
	}

	public String getServerConfigDetails() {
		return sqlConnectionConfiguration.getServerConfigDetails();
	}

	public DataSource getSqlConnectionConfig() {
		return dataSourceConfig;
	}
}
