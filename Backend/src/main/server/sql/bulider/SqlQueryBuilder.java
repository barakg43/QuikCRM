package main.server.sql.bulider;

import main.server.sql.bulider.component.SqlBaseClauses;
import main.server.sql.bulider.component.SqlFilterClauses;

public class SqlQueryBuilder {

    private StringBuilder fromClause=null;
    private SqlBaseClauses sqlBaseClauses=new SqlBaseClauses();
    private SqlFilterClauses sqlFilterClauses=new SqlFilterClauses(this::buildQuery);
    public SqlBaseClauses from(String tableName){
        fromClause=new StringBuilder("FROM ");
        fromClause.append(tableName);
        return sqlBaseClauses;
    }

    //callable only from last step
    private String buildQuery(){
        if(fromClause==null)
            throw new RuntimeException("Cannot build query without FROM clause");
        StringBuilder queryBuilder=new StringBuilder();


    }

}
