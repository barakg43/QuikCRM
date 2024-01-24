package main.server.http.controlles;

import main.server.http.HttpRequestExecutor;
import main.server.sql.dto.ListSubset;
import main.server.sql.dto.TaskRecord;
import main.server.sql.dto.customer.CustomerFlatDetailsRecord;
import main.server.sql.dto.customer.CustomerFullDetailsRecord;
import main.server.sql.executor.CustomerSqlExecutor;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;

@CrossOrigin("*")
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
	public String getTest() {
		System.out.println("test!!!");
		return "test";
	}

	@GetMapping("")
	public ListSubset<CustomerFlatDetailsRecord> getSubsetCustomersList(@RequestParam(required = false) Integer fromItem,
																		@RequestParam(required = false) Integer toItem) {
		System.out.println("customer all");
		ListSubset<CustomerFlatDetailsRecord> test =
				httpRequestExecutor.executeHttpRequest(() -> customerSqlExecutor.getSubsetOfCustomers(fromItem, toItem)
						, "api/customers",
						HttpMethod.GET);
		System.out.println(test.getListSubset());
		return test;

	}


	@GetMapping("/customer/name")
	public String getCostumerNameByID(@RequestParam int id) {
		return httpRequestExecutor.executeHttpRequest(() -> customerSqlExecutor.getCustomerNameByID(id), "api" +
				"/customers" +
				"/name", HttpMethod.GET);
//        return clientSqlExecutor.getClientNameByID(id);
	}

	@GetMapping("/{id}")
	public CustomerFullDetailsRecord getFullCustomerDetailsForId(@PathVariable("id") int id) {
		try {
			CustomerFullDetailsRecord test =
					httpRequestExecutor.executeHttpRequest(() -> customerSqlExecutor.getFullCustomerDetailsForId(id),
							"api/customers/" + id
							, HttpMethod.GET);
			System.out.println("getFullCustomerDetailsForId" + test);
			return test;
		} catch (IndexOutOfBoundsException exception) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND,
					"Cant find customer with id of " + id, exception);
		}
	}

	@PostMapping("")
	public void addNewCustomer(@RequestBody CustomerFullDetailsRecord customerDetails) {

		httpRequestExecutor.executeHttpRequest(() -> customerSqlExecutor.addNewCustomer(customerDetails),
				"api/customers/"
				, HttpMethod.POST);


	}

	@PatchMapping("/{id}")
	public void update(@PathVariable("id") int id,
					   @RequestBody CustomerFullDetailsRecord customerDetails) {
		try {
			httpRequestExecutor.executeHttpRequest(() -> customerSqlExecutor.updateCustomerDetails(customerDetails),
					"api/customers/" + id
					, HttpMethod.PATCH);

		} catch (IndexOutOfBoundsException exception) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND,
					"Cant update customer with id of " + id, exception);
		}
	}

	@GetMapping("/customer/closed-tasks")
	public List<TaskRecord> getClosedTaskForCustomer(@RequestParam int id) {
//        return sqlClient.getClosedTaskForCustomer(id);
		return null;
	}

	@GetMapping("/supplier/name")
	public String getSupplierNameByID(@RequestParam int id) {
		String result = "";
		Instant startTime = Instant.now();
//        result = sqlClient.getSupplierNameByID(id);
		Instant endTime = Instant.now();
		return result;
	}
}
