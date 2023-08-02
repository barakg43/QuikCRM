package com.quik.server.http;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.quik.server.logger.ServerLogManager;
import com.quik.server.sql.SqlClient;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.time.Instant;
import java.util.List;

import static com.quik.server.ServerConstants.SQL_YAML_CONFIG_LOCATION;

@RestController
public class CustomerHttpService {

    final SqlClient sqlClient;
    private final ServerLogManager logManager;

    public CustomerHttpService(ServerLogManager logManager) {
        sqlClient=new SqlClient(SQL_YAML_CONFIG_LOCATION,logManager);
        this.logManager = logManager;
    }
    @PostConstruct //start sql connection after CustomerHttpService ctor
    private void startSqlConnection(){
        sqlClient.createSqlConnection();
    }

    @GetMapping("/customer/name")
    public String getCostumerNameByID(@RequestParam int id){
        return sqlClient.getCostumerNameByID(id);
    }
    @GetMapping("/customer/closed-tasks")
    public List<TaskRecord> getClosedTaskForCustomer(@RequestParam int id){
        return sqlClient.getClosedTaskForCustomer(id);
    }
    @GetMapping("/supplier/name")
    public String getSupplierNameByID(@RequestParam int id){
        String result;
        Instant startTime=Instant.now();
        result= sqlClient.getSupplierNameByID(id);
        Instant endTime=Instant.now();
        logManager.addLogRecordToRequestLoggerInfoLevel("/supplier/name", HttpMethod.GET);
        return result;
    }
}
