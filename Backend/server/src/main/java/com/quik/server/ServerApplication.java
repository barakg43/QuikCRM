package com.quik.server;

import com.quik.server.sql.SqlClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.sql.SQLException;

import static com.quik.server.ServerConstants.SQL_YAML_CONFIG_LOCATION;

@SpringBootApplication()
public class ServerApplication {
    public static void main(String[] args) {
        testFunction();
        SpringApplication.run(ServerApplication.class, args);
    }

    private  static void testFunction(){
        SqlClient sqlClient=new SqlClient(SQL_YAML_CONFIG_LOCATION);
        sqlClient.createSqlConnection();
    }
    private static void printPWD() throws IOException{
        String currentPath = new java.io.File(".").getCanonicalPath();
        System.out.println("Current dir:" + currentPath);
    }
}
