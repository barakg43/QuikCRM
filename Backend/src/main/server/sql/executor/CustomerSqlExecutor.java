package main.server.sql.executor;

import main.server.sql.bulider.SqlQueryBuilder;
import main.server.sql.bulider.component.SqlInnerQueryBuilder;
import main.server.sql.bulider.component.SqlQueryDirector;
import main.server.sql.bulider.component.eJoinType;
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
		System.out.println("CustomerSqlExecutor ctor");

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
	public List<CustomerFlatDetailsRecord> getAllCustomers() {

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

		return sqlFunctionExecutor.executeTableValueQuery(
				sqlQuery, CustomerFlatDetailsRecord.class);

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
						SqlInnerQueryBuilder.build(statusQuery, "customerStatus"),
						"cust.customerMainPhone",
						"cust.customerMainFax",
						"cust.customerMainEMail",
						"cust.customerWebSite",
						"cust.remarks",
						"cust.activeContractID",
						"ca.address",
						"ca.city",
						"ca.postalCode",
						"ca.addressRemarks",
						"cp.contactPersonName",
						"cp.contactPersonPost",
						"cp.contactPersonPhone",
						"cp.contactPersonMobilePhone",
						"cp.contactPersonFax",
						"cp.contactPersonEMail")
				.where().equal("cust.customerID", id, false)
				.build();
		System.out.println(sqlQuery);
		return sqlFunctionExecutor.executeTableValueQuery(
				sqlQuery, CustomerFullDetailsRecord.class).get(0);
	}

	public String getCustomerNameByID(int id) {
		return sqlFunctionExecutor.executeScalarValueFunction("fncCustShortNameForCustID", String.class, id);
	}

	public List<TaskRecord> getClosedTaskForClient(int id) {
		return sqlFunctionExecutor.executeTableValueFunction("fncCustomersCloseTasksForID", TaskRecord.class, id);

	}

}
