package main.server.sql.executor;

import main.server.sql.function.SqlFunctionExecutor;

public class ReminderSqlExecutor {
    private final SqlFunctionExecutor sqlFunctionExecutor;

    public ReminderSqlExecutor(SqlFunctionExecutor sqlFunctionExecutor) {
        this.sqlFunctionExecutor = sqlFunctionExecutor;
    }
}
