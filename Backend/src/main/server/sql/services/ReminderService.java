package main.server.sql.services;

import main.server.sql.bulider.SqlQueryBuilder;
import main.server.sql.bulider.component.eJoinType;
import main.server.sql.dto.reminder.ContractRecord;
import main.server.sql.dto.reminder.InvoiceReminderRecord;
import main.server.sql.dto.reminder.RenewReminderRecord;
import main.server.sql.function.SqlFunctionExecutor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public class ReminderService {
	private final SqlFunctionExecutor sqlFunctionExecutor;

	public ReminderService(SqlFunctionExecutor sqlFunctionExecutor) {
		this.sqlFunctionExecutor = sqlFunctionExecutor;
	}

	public List<RenewReminderRecord> getRenews() {
		return sqlFunctionExecutor.executeTableValueFunction("fncSystemsDetailsForDate", RenewReminderRecord.class,
				LocalDateTime.now());

	}

	public List<ContractRecord> getServiceRenewReminders(int daysReminderBeforeExpiration) {

//        ( SELECT     TOP 100 PERCENT ReminderID, DateOfReminder, TimeOfReminder, ReminderRemark, Closed,
//        ResponsibleUserName
//        FROM         dbo.tbReminders
//        WHERE     (Closed = 0) AND (DateOfReminder < DATEADD(day, 1, @Date))
//        ORDER BY DateOfReminder, TimeOfReminder )

		String sqlQuery = SqlQueryBuilder.getNewBuilder()
				.from("dbo.tbCustomersContracts")
				.join(eJoinType.INNER, "tbCustomersDetails")
				.select(ContractRecord.class)
				.where().equal("Renewed", 0, false).and()
				.lessOrEqualThan("FinishDateOfContract",
						LocalDate.now().plusDays(daysReminderBeforeExpiration), true)
				.orderBy(new String[]{"FinishDateOfContract", "customerShortName"})
				.build();
		return sqlFunctionExecutor.supplyTableValueQuery(sqlQuery, ContractRecord.class);
//        return sqlFunctionExecutor.executeTableValueFunction("fncReminders", ServiceRenewReminderRecord.class,
//        LocalDateTime.now());

	}

	@Deprecated
	public List<InvoiceReminderRecord> getInvoiceReminders() {
//		SELECT     dbo.fncCustNameForActiveContractID(contractID) AS custShortName, contractID, dateOfDebit,
//		invoiceNum, renewal
//		FROM         dbo.tbInvoicesForContracts
//		WHERE     (invoiceNum IS NULL) AND (dateOfDebit < DATEADD(day, 1, @Date))
		String sqlQuery = SqlQueryBuilder.getNewBuilder()
				.from("tbInvoicesForContracts")
				.select("dbo.fncCustNameForActiveContractID(contractID) AS custShortName, contractID, dateOfDebit, " +
						"invoiceNum, renewal")
				.where()
				.is("invoiceNum", "NULL", false)
				.and().lessOrEqualThan("dateOfDebit", LocalDate.now(), true)
				.build();
		System.out.println(sqlQuery);
		return sqlFunctionExecutor.supplyTableValueQuery(sqlQuery, InvoiceReminderRecord.class);

	}
}
