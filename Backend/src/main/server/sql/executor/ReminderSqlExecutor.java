package main.server.sql.executor;

import main.server.sql.bulider.SqlQueryBuilder;
import main.server.sql.dto.reminder.InvoiceReminderRecord;
import main.server.sql.dto.reminder.RenewReminderRecord;
import main.server.sql.dto.reminder.ServiceRenewReminderRecord;
import main.server.sql.function.SqlFunctionExecutor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public class ReminderSqlExecutor {
	private final SqlFunctionExecutor sqlFunctionExecutor;

	public ReminderSqlExecutor(SqlFunctionExecutor sqlFunctionExecutor) {
		System.out.println("ReminderSqlExecutor ctor");
		this.sqlFunctionExecutor = sqlFunctionExecutor;
	}

	public List<RenewReminderRecord> getRenews() {
		return sqlFunctionExecutor.executeTableValueFunction("fncSystemsDetailsForDate", RenewReminderRecord.class,
				LocalDateTime.now());

	}

	public List<ServiceRenewReminderRecord> getServiceRenewReminders() {

//        ( SELECT     TOP 100 PERCENT ReminderID, DateOfReminder, TimeOfReminder, ReminderRemark, Closed,
//        ResponsibleUserName
//        FROM         dbo.tbReminders
//        WHERE     (Closed = 0) AND (DateOfReminder < DATEADD(day, 1, @Date))
//        ORDER BY DateOfReminder, TimeOfReminder )
		String sqlQuery = SqlQueryBuilder.getNewBuilder()
				.from("dbo.tbReminders")
				.select("ReminderID", "DateOfReminder", "TimeOfReminder", "ReminderRemark", "Closed",
						"ResponsibleUserName")
				.where().equal("Closed", 0, false).and().lessOrEqualThan("DateOfReminder", LocalDate.now(),
						true)
				.orderBy(new String[]{"DateOfReminder", "TimeOfReminder"})
				.build();
		return sqlFunctionExecutor.executeTableValueQuery(sqlQuery, ServiceRenewReminderRecord.class);
//        return sqlFunctionExecutor.executeTableValueFunction("fncReminders", ServiceRenewReminderRecord.class,
//        LocalDateTime.now());

	}

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
				.equal("invoiceNum", null, false)
				.and().lessOrEqualThan("dateOfDebit", LocalDate.now(), false)
				.build();
		return sqlFunctionExecutor.executeTableValueQuery("sqlQuery", InvoiceReminderRecord.class);

	}
}
