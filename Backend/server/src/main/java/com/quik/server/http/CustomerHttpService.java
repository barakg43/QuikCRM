package com.quik.server.http;

import com.quik.server.sql.SqlClient;
import jakarta.annotation.PostConstruct;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static com.quik.server.ServerConstants.SQL_YAML_CONFIG_LOCATION;

@RestController
public class CustomerHttpService {

    final SqlClient sqlClient;
    public CustomerHttpService() {
        sqlClient=new SqlClient(SQL_YAML_CONFIG_LOCATION);
    }
    @PostConstruct //start sql connection after CustomerHttpService ctor
    private void startSqlConnection(){
        sqlClient.createSqlConnection();
    }

    @GetMapping("/customer/name")
    public String getCostumerNameByID(@RequestParam int id){
        return sqlClient.getCostumerNameByID(id);
    }
    @GetMapping("/supplier/name")
    public String getSupplierNameByID(@RequestParam int id){
        return sqlClient.getSupplierNameByID(id);
    }
}
