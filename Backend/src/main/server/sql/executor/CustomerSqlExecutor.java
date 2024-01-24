package main.server.sql.executor;

import main.server.sql.bulider.SqlQueryBuilder;
import main.server.sql.bulider.component.SqlInnerQueryBuilder;
import main.server.sql.bulider.component.SqlQueryDirector;
import main.server.sql.dto.ListSubset;
import main.server.sql.dto.TaskRecord;
import main.server.sql.dto.customer.CustomerFlatDetailsRecord;
import main.server.sql.dto.customer.CustomerFullDetailsRecord;
import main.server.sql.function.SqlFunctionExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CustomerSqlExecutor {
	final SqlFunctionExecutor sqlFunctionExecutor;

	public CustomerSqlExecutor(SqlFunctionExecutor sqlFunctionExecutor) {
		this.sqlFunctionExecutor = sqlFunctionExecutor;

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
	public ListSubset<CustomerFlatDetailsRecord> getSubsetOfCustomers(Integer fromItemNumber, Integer toItemNumber) {


//		SqlQueryDirector statusQuery = SqlQueryBuilder.getNewBuilder()
//				.from("tbCustomersStatuses")
//				.select("CustomersStatusDescription")
//				.where()
//				.equal("CustomersStatusID", "customerStatusID", false);

		String sqlQuery = SqlQueryBuilder.getNewBuilder().from("tbCustomersDetails")
				.select("customerID",
						"customerShortName",
						SqlInnerQueryBuilder.build(getCustomerDescriptionFoID(), "customerStatus"),
						"customerMainPhone",
						"address",
						"city")
				.build();
		List<CustomerFlatDetailsRecord> customerList = sqlFunctionExecutor.supplyTableValueQuery(
				sqlQuery, CustomerFlatDetailsRecord.class);
		int totalItemInDb = getCustomersAmount();
		System.out.println(sqlQuery);
		return new ListSubset<>(customerList, totalItemInDb);

	}

	public void addNewCustomer(CustomerFullDetailsRecord customerDetails) {
//		String sqlQueryGetIds = SqlQueryBuilder.getNewBuilder()
//				.from("tbCustomers")
//				.select("mainAddress", "mainContactPerson")
//				.where().equal("customerID", customerDetails.getCustomerID(), false)
//				.build();
//		CustomerAddressIdContactId customerAddressIdContactId = sqlFunctionExecutor.executeTableValueQuery(
//				sqlQueryGetIds, CustomerAddressIdContactId.class).get(0);


//		String sqlInsertQueryContactTable = SqlQueryBuilder.getNewBuilder()
//				.from("tbCustomersContactPersons").insert(customerDetails, "customersContactPersonID",
//						"contactPersonName",
//						"contactPersonMobilePhone")
//				.build();
//		String sqlUpdateQueryAddressTable = SqlQueryBuilder.getNewBuilder()
//				.from("tbCustomersAddresses").insert(customerDetails, "customersAddressID",
//						"address",
//						"postalCode",
//						"city",
//						"addressRemarks")
//				.build();
//		System.out.println(sqlInsertQueryContactTable);
//		System.out.println(sqlUpdateQueryAddressTable);
//		Integer contactId = sqlFunctionExecutor.supplyScalarValueQuery(sqlInsertQueryContactTable, Integer.class);
//		Integer addressId = sqlFunctionExecutor.supplyScalarValueQuery(sqlUpdateQueryAddressTable, Integer.class);
//		System.out.println(contactId + " add: " + addressId);
//		customerDetails.setMainAddress(addressId);
//		customerDetails.setMainContactPerson(contactId);
		customerDetails.setCustomerStatusID(
				getCustomerStatusIdFromDescription(
						customerDetails.getCustomerStatus()
				));
		System.out.println(getCustomerStatusIdFromDescription(
				customerDetails.getCustomerStatus()));
		String sqlInsertQueryCustomerTable = SqlQueryBuilder.getNewBuilder()
				.from("tbCustomersDetails").insert(customerDetails, null,
						"customerName",
						"customerShortName",
						"customerIdentificationNumber",
						"customerStatusID",
						"customerMainPhone",
						"customerMainEMail",
						"remarks",
						"activeContractID",
						"address",
						"city",
						"postalCode",
						"addressRemarks",
						"contactPersonName",
						"contactPersonPost",
						"contactPersonPhone",
						"contactPersonMobilePhone")
				.build();

		System.out.println(sqlInsertQueryCustomerTable);
		sqlFunctionExecutor.runQuery(sqlInsertQueryCustomerTable);

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
				.build();
		return sqlFunctionExecutor.supplyScalarValueQuery(sqlQuery, Integer.class);
	}

	public void updateCustomerDetails(CustomerFullDetailsRecord customerDetailsUpdated) {
//		System.out.println(customerDetailsUpdated);
//		String sqlQueryGetIds = SqlQueryBuilder.getNewBuilder()
//				.from("tbCustomers")
//				.select("mainAddress", "mainContactPerson")
//				.where().equal("customerID", customerDetailsUpdated.getCustomerID(), false)
//				.build();
//		CustomerAddressIdContactId customerAddressIdContactId = sqlFunctionExecutor.supplyTableValueQuery(
//				sqlQueryGetIds, CustomerAddressIdContactId.class).get(0);
//		System.out.println(customerAddressIdContactId);
		customerDetailsUpdated.setCustomerStatusID(
				getCustomerStatusIdFromDescription(
						customerDetailsUpdated.getCustomerStatus()
				));
		String sqlUpdateQueryCustomerTable = SqlQueryBuilder.getNewBuilder()
				.from("tbCustomersDetails").update(customerDetailsUpdated,
						"customerName",
						"customerShortName",
						"customerIdentificationNumber",
						"customerStatusID",
						"customerMainPhone",
						"customerMainEMail",
						"remarks",
						"activeContractID",
						"address",
						"city",
						"postalCode",
						"addressRemarks",
						"contactPersonName",
						"contactPersonPost",
						"contactPersonPhone",
						"contactPersonMobilePhone")
				.where()
				.equal("customerID", customerDetailsUpdated.getCustomerID(), false)
				.build();
//		String sqlUpdateQueryContactTable = SqlQueryBuilder.getNewBuilder()
//				.from("tbCustomersContactPersons").update(customerDetailsUpdated, "contactPersonName",
//						"contactPersonMobilePhone").where()
//				.equal("customersContactPersonID", customerAddressIdContactId.getMainContactPerson(), false)
//				.build();
//		String sqlUpdateQueryAddressTable = SqlQueryBuilder.getNewBuilder()
//				.from("tbCustomersAddresses").update(customerDetailsUpdated,
//						"address", "postalCode", "city", "addressRemarks")
//				.where()
//				.equal("customersAddressID", customerAddressIdContactId.getMainAddress(), false)
//				.build();

		sqlFunctionExecutor.runQuery(sqlUpdateQueryCustomerTable);
//		sqlFunctionExecutor.runQuery(sqlUpdateQueryContactTable);
//		sqlFunctionExecutor.runQuery(sqlUpdateQueryAddressTable);

	}

	public CustomerFullDetailsRecord getFullCustomerDetailsForId(int id) {

		String sqlQuery = SqlQueryBuilder.getNewBuilder()
				.from("dbo.tbCustomersDetails")
				.select("customerID",
						"customerShortName",
						"activeContractID",
						"customerName",
						"customerIdentificationNumber",
						SqlInnerQueryBuilder.build(getCustomerDescriptionFoID(), "customerStatus"),
						"customerMainPhone",
						"customerMainEMail",
						"remarks",
						"address",
						"city",
						"postalCode",
						"addressRemarks",
						"contactPersonName",
						"contactPersonMobilePhone")
				.where().equal("customerID", id, false)
				.build();
		System.out.println(sqlQuery);

		return sqlFunctionExecutor.supplyTableValueQuery(
				sqlQuery, CustomerFullDetailsRecord.class).get(0);
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
