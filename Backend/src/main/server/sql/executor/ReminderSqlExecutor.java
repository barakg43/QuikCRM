package main.server.sql.executor;

import main.server.sql.dto.reminder.InvoiceReminderRecord;
import main.server.sql.dto.reminder.ServiceRenewReminderRecord;
import main.server.sql.dto.reminder.RenewReminderRecord;
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

    public List<RenewReminderRecord> getRenews(){
        return sqlFunctionExecutor.executeTableValueFunction("fncSystemsDetailsForDate", RenewReminderRecord.class, LocalDateTime.now());

    }
    public List<ServiceRenewReminderRecord>  getServiceRenewReminders(){
        return sqlFunctionExecutor.executeTableValueFunction("fncReminders", ServiceRenewReminderRecord.class, LocalDateTime.now());

    }
    public List<InvoiceReminderRecord> getInvoiceReminders()
    {
        return sqlFunctionExecutor.executeTableValueFunction("fncInvoicesForContracts", InvoiceReminderRecord.class, LocalDateTime.now());

    }
}
