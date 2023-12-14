package main.server.http.controlles;

import main.server.http.HttpRequestExecutor;
import main.server.http.json.dto.TaskRecord;
import main.server.logger.ServerLogManager;
import main.server.sql.executor.ClientSqlExecutor;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.List;

@RestController
public class ClientController {

   private final HttpRequestExecutor httpRequestExecutor;
    final private ClientSqlExecutor clientSqlExecutor;

    public ClientController(HttpRequestExecutor httpRequestExecutor, ClientSqlExecutor clientSqlExecutor) {
        this.httpRequestExecutor = httpRequestExecutor;
//        sqlClient = new SqlClient(SQL_YAML_CONFIG_LOCATION, logManager);
        this.clientSqlExecutor = clientSqlExecutor;
    }

    //    @PostConstruct //start sql connection after CustomerHttpService ctor
    private void startSqlConnection() {
//        sqlClient.createSqlConnection();
    }
    @GetMapping("/test")
    public String getTest(){
        System.out.println("test!!!");
        return "test";
    }
    @GetMapping("/customer/name")
    public String getCostumerNameByID(@RequestParam int id) {
        return httpRequestExecutor.executeHttpRequest(()->clientSqlExecutor.getClientNameByID(id),"/customer/name",HttpMethod.GET);
//        return clientSqlExecutor.getClientNameByID(id);
    }

    @GetMapping("/customer/closed-tasks")
    public List<TaskRecord> getClosedTaskForCustomer(@RequestParam int id) {
//        return sqlClient.getClosedTaskForCustomer(id);
        return null;
    }

    @GetMapping("/supplier/name")
    public String getSupplierNameByID(@RequestParam int id) {
        String result="";
        Instant startTime = Instant.now();
//        result = sqlClient.getSupplierNameByID(id);
        Instant endTime = Instant.now();
        return result;
    }
}
