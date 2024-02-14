package main.server.sql.services;

import main.server.sql.bulider.SqlQueryBuilder;
import main.server.sql.bulider.component.SqlQueryDirector;
import main.server.sql.dto.ListSubset;
import main.server.sql.dto.TaskRecord;
import main.server.sql.dto.customer.CustomerFullDetailsRecord;
import main.server.sql.dto.customer.CustomerSlimDetailsRecord;
import main.server.sql.entities.Customer;
import main.server.sql.function.SqlFunctionExecutor;
import main.server.sql.repositories.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {
	final SqlFunctionExecutor sqlFunctionExecutor;
	private final CustomerRepository customerRepository;

	public CustomerService(SqlFunctionExecutor sqlFunctionExecutor, CustomerRepository customerRepository) {
		this.sqlFunctionExecutor = sqlFunctionExecutor;

		this.customerRepository = customerRepository;
	}

	public List<CustomerFullDetailsRecord> getAllCustomers2() {
		return sqlFunctionExecutor.executeTableValueFunction(
				"fncCustomersWithContactAndMainAddress", CustomerFullDetailsRecord.class);
	}

	//    SELECT TOP 100 PERCENT

	//    FROM dbo.tbCustomers AS cust
//    JOIN dbo.tbCustomersAddresses AS ca ON cust.mainAddress = ca.customersAddressID
//    JOIN dbo.tbCustomersContactPersons AS cp ON cust.mainContactPerson = cp.customersContactPersonID
//    ORDER BY cust.customerShortName
	public ListSubset<CustomerSlimDetailsRecord> getSubsetOfCustomers(Integer fromItemNumber, Integer toItemNumber) {


//		SqlQueryDirector statusQuery = SqlQueryBuilder.getNewBuilder()
//				.from("tbCustomersStatuses")
//				.select("CustomersStatusDescription")
//				.where()
//				.equal("CustomersStatusID", "customerStatusID", false);

//		String sqlQuery = SqlQueryBuilder.getNewBuilder().from("tbCustomersDetails")
//				.select("customerID",
//						"customerShortName",
//						SqlInnerQueryBuilder.build(getCustomerDescriptionFoID(), "customerStatus"),
//						"customerMainPhone",
//						"address",
//						"city")
//				.build();
		List<CustomerSlimDetailsRecord> customerList = customerRepository.findAlCustomerDetails();
//		List<CustomerSlimDetailsRecord> customerList = new ArrayList<>();
//		List<CustomerSlimDetailsRecord> customerList = sqlFunctionExecutor.supplyTableValueQuery(
//				sqlQuery, CustomerSlimDetailsRecord.class);
		int totalItemInDb = getCustomersAmount();
//		System.out.println(sqlQuery);
		return new ListSubset<>(customerList, totalItemInDb);

	}

	public void addNewCustomer(CustomerFullDetailsRecord customerDetails) {

//		customerDetails.setCustomerStatusID(
//				getCustomerStatusIdFromDescription(
//						customerDetails.getCustomerStatus()
//				));
//		System.out.println(getCustomerStatusIdFromDescription(
//				customerDetails.getCustomerStatus()));
//		String sqlInsertQueryCustomerTable = SqlQueryBuilder.getNewBuilder()
//				.from("tbCustomersDetails").insert(customerDetails, null,
//						"customerName",
//						"customerShortName",
//						"customerIdentificationNumber",
//						"customerStatusID",
//						"customerMainPhone",
//						"customerMainEMail",
//						"remarks",
//						"activeContractID",
//						"address",
//						"city",
//						"postalCode",
//						"addressRemarks",
//						"contactPersonName",
//						"contactPersonPost",
//						"contactPersonPhone",
//						"contactPersonMobilePhone")
//				.build();
//
//		System.out.println(sqlInsertQueryCustomerTable);
//		sqlFunctionExecutor.runQuery(sqlInsertQueryCustomerTable);

	}

	private SqlQueryDirector getCustomerDescriptionFoID() {
		return SqlQueryBuilder.getNewBuilder()
				.from("tbCustomersStatuses")
				.select("CustomersStatusDescription")
				.where()
				.equal("CustomersStatusID", "customerStatusID", false);
	}

	private Integer getCustomerStatusIdFromDescription(String customerStatus) {

		String sqlQuery = SqlQueryBuilder.getNewBuilder()
				.from("tbCustomersStatuses").select("CustomersStatusID")
				.where()
				.equal("CustomersStatusDescription", customerStatus, true)
				.orderBy(new String[]{"CustomersStatusID"}, 0, 1)
				.build();
		return sqlFunctionExecutor.supplyScalarValueQuery(sqlQuery, Integer.class);
	}

	public void updateCustomerDetails(CustomerFullDetailsRecord customerDetailsUpdated) {
////		System.out.println(customerDetailsUpdated);
////		String sqlQueryGetIds = SqlQueryBuilder.getNewBuilder()
////				.from("tbCustomers")
////				.select("mainAddress", "mainContactPerson")
////				.where().equal("customerID", customerDetailsUpdated.getCustomerID(), false)
////				.build();
////		CustomerAddressIdContactId customerAddressIdContactId = sqlFunctionExecutor.supplyTableValueQuery(
////				sqlQueryGetIds, CustomerAddressIdContactId.class).get(0);
////		System.out.println(customerAddressIdContactId);
//		customerDetailsUpdated.setCustomerStatusID(
//				getCustomerStatusIdFromDescription(
//						customerDetailsUpdated.getCustomerStatus()
//				));
//		String sqlUpdateQueryCustomerTable = SqlQueryBuilder.getNewBuilder()
//				.from("tbCustomersDetails").update(customerDetailsUpdated,
//						"customerName",
//						"customerShortName",
//						"customerIdentificationNumber",
//						"customerStatusID",
//						"customerMainPhone",
//						"customerMainEMail",
//						"remarks",
//						"activeContractID",
//						"address",
//						"city",
//						"postalCode",
//						"addressRemarks",
//						"contactPersonName",
//						"contactPersonPost",
//						"contactPersonPhone",
//						"contactPersonMobilePhone")
//				.where()
//				.equal("customerID", customerDetailsUpdated.getCustomerID(), false)
//				.build();
////		String sqlUpdateQueryContactTable = SqlQueryBuilder.getNewBuilder()
////				.from("tbCustomersContactPersons").update(customerDetailsUpdated, "contactPersonName",
////						"contactPersonMobilePhone").where()
////				.equal("customersContactPersonID", customerAddressIdContactId.getMainContactPerson(), false)
////				.build();
////		String sqlUpdateQueryAddressTable = SqlQueryBuilder.getNewBuilder()
////				.from("tbCustomersAddresses").update(customerDetailsUpdated,
////						"address", "postalCode", "city", "addressRemarks")
////				.where()
////				.equal("customersAddressID", customerAddressIdContactId.getMainAddress(), false)
////				.build();
//
//		sqlFunctionExecutor.runQuery(sqlUpdateQueryCustomerTable);
//		sqlFunctionExecutor.runQuery(sqlUpdateQueryContactTable);
//		sqlFunctionExecutor.runQuery(sqlUpdateQueryAddressTable);

	}

	public CustomerFullDetailsRecord getFullCustomerDetailsForId(int id) {

//		String sqlQuery = SqlQueryBuilder.getNewBuilder()
//				.from("dbo.tbCustomersDetails")
//				.select("customerID",
//						"customerShortName",
//						"activeContractID",
//						"customerName",
//						"customerIdentificationNumber",
//						SqlInnerQueryBuilder.build(getCustomerDescriptionFoID(), "customerStatus"),
//						"customerMainPhone",
//						"customerMainEMail",
//						"remarks",
//						"address",
//						"city",
//						"postalCode",
//						"addressRemarks",
//						"contactPersonName",
//						"contactPersonMobilePhone")
//				.where().equal("customerID", id, false)
//				.build();
//		System.out.println(sqlQuery);
//
//		return sqlFunctionExecutor.supplyTableValueQuery(
//				sqlQuery, CustomerFullDetailsRecord.class).get(0);
		return customerRepository.getCustomerByCustomerID(id);
	}

	public void deleteCustomer(int id) {
		String sqlDeleteQuery = SqlQueryBuilder.getNewBuilder()
				.from("dbo.tbCustomersDetails")
				.delete()
				.where().equal("customerID", id, false)
				.build();
		sqlFunctionExecutor.runQuery(sqlDeleteQuery);

	}

	private int getCustomersAmount() {
		String sqlQuery = SqlQueryBuilder.getNewBuilder()
				.from("tbCustomers")
				.select("COUNT(customerID)").build();

		return sqlFunctionExecutor.supplyScalarValueQuery(sqlQuery, int.class);
	}

	public String getCustomerNameByID(int id) {
		return sqlFunctionExecutor.executeScalarValueFunction("fncCustShortNameForCustID", String.class, id);
	}

	public List<TaskRecord> getClosedTaskForClient(int id) {
		return sqlFunctionExecutor.executeTableValueFunction("fncCustomersCloseTasksForID", TaskRecord.class, id);

	}

}
