package main.server.sql.executor;

import main.server.sql.dto.TaskRecord;
import main.server.sql.dto.customer.CustomerFullDetailsRecord;
import main.server.sql.function.SqlFunctionExecutor;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Repository
public class CustomerSqlExecutor {
    final SqlFunctionExecutor sqlFunctionExecutor;
    public CustomerSqlExecutor(SqlFunctionExecutor sqlFunctionExecutor) {
        this.sqlFunctionExecutor = sqlFunctionExecutor;
        System.out.println("CustomerSqlExecutor ctor");

    }

    public List<CustomerFullDetailsRecord> getAllCustomers(){
        List<CustomerFullDetailsRecord> list= sqlFunctionExecutor.executeTableValueFunction("fncCustomersWithContactAndMainAddress", CustomerFullDetailsRecord.class);
        System.out.println(list.get(1));
        return list;
    }
    public String getCustomerNameByID(int id) {
        return sqlFunctionExecutor.executeScalarValueFunction("fncCustShortNameForCustID",String.class, id);
    }
    public List<TaskRecord> getClosedTaskForClient(int id) {
        return sqlFunctionExecutor.executeTableValueFunction("fncCustomersCloseTasksForID",TaskRecord.class, id);

    }

}
