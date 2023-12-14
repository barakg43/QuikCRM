package main.server.sql.executor;

import main.server.http.json.dto.reminder.InvoiceReminderRecord;
import main.server.http.json.dto.reminder.ReminderRecord;
import main.server.http.json.dto.reminder.RenewReminderRecord;
import main.server.sql.function.SqlFunctionExecutor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public class ReminderSqlExecutor {
    private final SqlFunctionExecutor sqlFunctionExecutor;

    public ReminderSqlExecutor(SqlFunctionExecutor sqlFunctionExecutor) {
        System.out.println("ReminderSqlExecutor ctor");
        this.sqlFunctionExecutor = sqlFunctionExecutor;
    }

    public List<RenewReminderRecord> getRenewsForTheNext2Month(){
        return sqlFunctionExecutor.executeTableValueFunction("fncSystemsDetailsForDate", RenewReminderRecord.class, LocalDateTime.now());

    }
    public List<ReminderRecord> getReminders(){
        return sqlFunctionExecutor.executeTableValueFunction("fncReminders", ReminderRecord.class, LocalDateTime.now());

    }
    public List<InvoiceReminderRecord> getInvoiceReminders()
    {
        return sqlFunctionExecutor.executeTableValueFunction("fncInvoicesForContracts_New", InvoiceReminderRecord.class, LocalDateTime.now());

    }
}
