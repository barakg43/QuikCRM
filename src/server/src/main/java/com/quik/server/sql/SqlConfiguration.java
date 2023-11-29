package com.quik.server.sql;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class SqlConfiguration {
    private final String serverName;
    private final int port;
    private final String databaseName;
    private final String username;

    private final String password;

    public SqlConfiguration() {
        this.serverName = null;
        this.port = 0;
        this.databaseName = null;
        this.username = null;
        this.password = null;
    }

    public SqlConfiguration(String serverName, int port, String databaseName, String username, String password) {
        this.serverName = serverName;
        this.port = port;
        this.databaseName = databaseName;
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getServerName() {
        return serverName;
    }

    public int getPort() {
        return port;
    }

    public String getDatabaseName() {
        return databaseName;
    }

    public String getServerConfigDetails() {
        return String.format("Server name: %s | Port: %d | Database name: %s", serverName, port, databaseName);
    }
}
