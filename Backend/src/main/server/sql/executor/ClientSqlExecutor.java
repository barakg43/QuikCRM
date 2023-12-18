package main.server.sql.executor;

import main.server.sql.dto.TaskRecord;
import main.server.sql.function.SqlFunctionExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ClientSqlExecutor {
    final SqlFunctionExecutor sqlFunctionExecutor;
    public ClientSqlExecutor(SqlFunctionExecutor sqlFunctionExecutor) {
        this.sqlFunctionExecutor = sqlFunctionExecutor;
        System.out.println("ClientSqlExecutor ctor");

    }
    public String getClientNameByID(int id) {
        return sqlFunctionExecutor.executeScalarValueFunction("fncCustShortNameForCustID",String.class, id);
    }
    public List<TaskRecord> getClosedTaskForClient(int id) {
        return sqlFunctionExecutor.executeTableValueFunction("fncCustomersCloseTasksForID",TaskRecord.class, id);

    }

}
