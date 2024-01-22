package main.server.sql.executor;

import main.server.sql.bulider.SqlQueryBuilder;
import main.server.sql.bulider.component.SqlInnerQueryBuilder;
import main.server.sql.bulider.component.SqlQueryDirector;
import main.server.sql.bulider.component.eJoinType;
import main.server.sql.dto.ListSubset;
import main.server.sql.dto.TaskRecord;
import main.server.sql.dto.customer.CustomerAddressIdContactId;
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


		SqlQueryDirector statusQuery = SqlQueryBuilder.getNewBuilder()
				.from("tbCustomersStatuses")
				.select("CustomersStatusDescription")
				.where()
				.equal("CustomersStatusID", "cust.customerStatusID", false);

		String sqlQuery = SqlQueryBuilder.getNewBuilder().from("tbCustomers", "cust")
				.join(eJoinType.INNER, "tbCustomersAddresses",
						"ca", "cust.mainAddress", "ca.customersAddressID")
				.select("cust.customerID",
						"cust.customerShortName",
						SqlInnerQueryBuilder.build(statusQuery, "customerStatus"),
						"cust.customerMainPhone",
						"ca.address",
						"ca.city")
				.build();
		List<CustomerFlatDetailsRecord> customerList = sqlFunctionExecutor.executeTableValueQuery(
				sqlQuery, CustomerFlatDetailsRecord.class);
		int totalItemInDb = getCustomersAmount();
		return new ListSubset<>(customerList, totalItemInDb);

	}

	public void updateCustomerDetails(CustomerFullDetailsRecord customerDetailsUpdated) {
//		System.out.println(customerDetailsUpdated);
		String sqlQueryGetIds = SqlQueryBuilder.getNewBuilder()
				.from("tbCustomers")
				.select("mainAddress", "mainContactPerson")
				.where().equal("customerID", customerDetailsUpdated.getCustomerID(), false)
				.build();
		CustomerAddressIdContactId customerAddressIdContactId = sqlFunctionExecutor.executeTableValueQuery(
				sqlQueryGetIds, CustomerAddressIdContactId.class).get(0);
		System.out.println(customerAddressIdContactId);
		String sqlUpdateQueryCustomerTable = SqlQueryBuilder.getNewBuilder()
				.from("tbCustomers").update(customerDetailsUpdated, "customerShortName", "customerName",
						"customerIdentificationNumber", "customerMainPhone", "remarks",
						"customerMainEMail")
				.where()
				.equal("customerID", customerDetailsUpdated.getCustomerID(), false)
				.build();
		String sqlUpdateQueryContactTable = SqlQueryBuilder.getNewBuilder()
				.from("tbCustomersContactPersons").update(customerDetailsUpdated, "contactPersonName",
						"contactPersonMobilePhone").where()
				.equal("customersContactPersonID", customerAddressIdContactId.getMainContactPerson(), false)
				.build();
		String sqlUpdateQueryAddressTable = SqlQueryBuilder.getNewBuilder()
				.from("tbCustomersAddresses").update(customerDetailsUpdated,
						"address", "postalCode", "city", "addressRemarks")
				.where()
				.equal("customersAddressID", customerAddressIdContactId.getMainAddress(), false)
				.build();

		sqlFunctionExecutor.update(sqlUpdateQueryCustomerTable);
		sqlFunctionExecutor.update(sqlUpdateQueryContactTable);
		sqlFunctionExecutor.update(sqlUpdateQueryAddressTable);
//		"cust.customerID",
//				"cust.activeContractID",
//
//				"cust.activeContractID",
//				SqlInnerQueryBuilder.build(statusQuery, "customerStatus"),
//				"ca.address",
//				"ca.city",
//				"ca.postalCode",
//				"ca.addressRemarks",
//				"cp.contactPersonName",
//				"cp.contactPersonMobilePhone")

	}

	public CustomerFullDetailsRecord getFullCustomerDetailsForId(int id) {

		SqlQueryDirector statusQuery = SqlQueryBuilder.getNewBuilder()
				.from("tbCustomersStatuses")
				.select("CustomersStatusDescription")
				.where()
				.equal("CustomersStatusID", id, false);
		String sqlQuery = SqlQueryBuilder.getNewBuilder()
				.from("dbo.tbCustomers", "cust")
				.join(eJoinType.INNER, "dbo.tbCustomersAddresses",
						"ca", "cust.mainAddress", "ca.customersAddressID")
				.join(eJoinType.INNER, "dbo.tbCustomersContactPersons", "cp", "cust.mainContactPerson", "cp" +
						".customersContactPersonID")
				.select("cust.customerID",
						"cust.customerShortName",
						"cust.activeContractID",
						"cust.customerName",
						"cust.activeContractID",
						"customerIdentificationNumber",
						SqlInnerQueryBuilder.build(statusQuery, "customerStatus"),
						"cust.customerMainPhone",
						"cust.customerMainEMail",
						"cust.remarks",
						"ca.address",
						"ca.city",
						"ca.postalCode",
						"ca.addressRemarks",
						"cp.contactPersonName",
						"cp.contactPersonMobilePhone")
				.where().equal("cust.customerID", id, false)
				.build();
		System.out.println(sqlQuery);

		return sqlFunctionExecutor.executeTableValueQuery(
				sqlQuery, CustomerFullDetailsRecord.class).get(0);
	}

	private int getCustomersAmount() {
		String sqlQuery = SqlQueryBuilder.getNewBuilder()
				.from("tbCustomers")
				.select("COUNT(customerID)").build();

		return sqlFunctionExecutor.executeScalarValueQuery(sqlQuery, int.class);
	}

	public String getCustomerNameByID(int id) {
		return sqlFunctionExecutor.executeScalarValueFunction("fncCustShortNameForCustID", String.class, id);
	}

	public List<TaskRecord> getClosedTaskForClient(int id) {
		return sqlFunctionExecutor.executeTableValueFunction("fncCustomersCloseTasksForID", TaskRecord.class, id);

	}

}
