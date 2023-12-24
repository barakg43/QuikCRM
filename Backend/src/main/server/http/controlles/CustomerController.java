package main.server.http.controlles;

import main.server.http.HttpRequestExecutor;
import main.server.sql.dto.TaskRecord;
import main.server.sql.dto.customer.CustomerFullDetailsRecord;
import main.server.sql.executor.CustomerSqlExecutor;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

   private final HttpRequestExecutor httpRequestExecutor;
    final private CustomerSqlExecutor customerSqlExecutor;

    public CustomerController(HttpRequestExecutor httpRequestExecutor, CustomerSqlExecutor customerSqlExecutor) {
        this.httpRequestExecutor = httpRequestExecutor;
//        sqlClient = new SqlClient(SQL_YAML_CONFIG_LOCATION, logManager);
        this.customerSqlExecutor = customerSqlExecutor;
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
    @GetMapping("")
    public List<CustomerFullDetailsRecord> getAllCustomers() {
        return httpRequestExecutor.executeHttpRequest(customerSqlExecutor::getAllCustomers,"/customers",HttpMethod.GET);

    }
    @GetMapping("/customer/name")
    public String getCostumerNameByID(@RequestParam int id) {
        return httpRequestExecutor.executeHttpRequest(()-> customerSqlExecutor.getCustomerNameByID(id),"/customer/name",HttpMethod.GET);
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
