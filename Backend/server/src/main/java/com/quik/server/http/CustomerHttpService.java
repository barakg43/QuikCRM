package com.quik.server.http;

import com.quik.server.sql.SqlClient;
import jakarta.annotation.PostConstruct;
import org.springframework.web.bind.annotation.InitBinder;
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


    public String getCostumerNameByID(int id){
        return sqlClient.getCostumerNameByID(id);
    }

    public String getSupplierNameByID(int id){
        return sqlClient.getSupplierNameByID(id);
    }
}
