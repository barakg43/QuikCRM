package main.server.sql.bulider.component;

import java.util.function.Supplier;

public class SqlFilterClausesBuilder extends SqlFilterClauses {

    public SqlFilterClausesBuilder(Supplier<String> queryBuilder) {
        super(queryBuilder);
    }
    public String buildFilterClausePart(){

        StringBuilder queryBuilder=new StringBuilder();
        appendClauseToBuilder(queryBuilder,whereClause);
        appendClauseToBuilder(queryBuilder,groupByClause);
        appendClauseToBuilder(queryBuilder,havingClause);
        appendClauseToBuilder(queryBuilder,orderByClause);
        appendClauseToBuilder(queryBuilder,limitClause);

        return queryBuilder.toString();
    }
    private void appendClauseToBuilder(StringBuilder queryBuilder,String clause){
        String clauseDelimiter=" \n ";
        if(clause!=null){
            queryBuilder.append(clause).append(clauseDelimiter);
        }
    }
    private void appendClauseToBuilder(StringBuilder queryBuilder,StringBuilder clauseBuilder){
        if(clauseBuilder!=null){
            appendClauseToBuilder(queryBuilder,clauseBuilder.toString());
        }
    }
}
