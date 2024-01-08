package main.server.sql.bulider.component;

import java.util.function.Supplier;

public class SqlFilterClauses extends SqlQueryDirector {
    private StringBuilder whereClause=null;
    private StringBuilder havingClause=null;
    private StringBuilder orderByClause=null;
    private StringBuilder groupByClause=null;
    private String limitClause=null;
    private enum FilterClause{
        HAVING, WHERE
    }
    private FilterClause currentFilterClause;

//    WHERE <predicate on rows>	2.
//    GROUP BY <columns>	3.
//    HAVING <predicate on groups>	4.
//    ORDER BY <columns>
    public SqlFilterClauses(Supplier<String> queryBuilder) {
        super(queryBuilder);
    }
    public SqlFilterClauses where(){
        whereClause=new StringBuilder("WHERE ");
        currentFilterClause=FilterClause.WHERE;
        return this;
    }
    public SqlFilterClauses having(){
        whereClause=new StringBuilder("HAVING ");
        currentFilterClause=FilterClause.HAVING;
        return this;
    }

    public SqlFilterClauses groupBy(String ...columnNames){
        groupByClause=new StringBuilder("GROUP BY ");
        for (String column:columnNames) {
            groupByClause.append(column).append(", ");
        }
        return this;
    }
    public SqlFilterClauses orderBy(String ...columnNames){
        orderByClause=new StringBuilder("ORDER BY ");
        for (String column:columnNames) {
            orderByClause.append(column).append(", ");
        }
        return this;
    }
    public SqlFilterClauses limit(int rowCount){
        limitClause="LIMIT "+rowCount;
        return this;
    }

    public SqlFilterClauses and(){
        appendStatementToCurrentClauseBuilder(" AND ");
        return this;
    }
    public SqlFilterClauses not(){
        appendStatementToCurrentClauseBuilder(" NOT ");
        return this;
    }
    public SqlFilterClauses or(){
        appendStatementToCurrentClauseBuilder(" OR ");
        return this;
    }
    public SqlFilterClauses equal(String columnName,Object value){
        appendConditionToClause(columnName,value,"=");
        return this;
    }
    public SqlFilterClauses notEqual(String columnName,Object value){
        appendConditionToClause(columnName,value,"<>");
        return this;
    }
    public SqlFilterClauses greaterThan(String columnName,Object value){
        appendConditionToClause(columnName,value,">");
        return this;
    }
    public SqlFilterClauses greaterOrEqualThan(String columnName,Object value){
        appendConditionToClause(columnName,value,">=");
        return this;
    }
    public SqlFilterClauses lessThan(String columnName,Object value){
        appendConditionToClause(columnName,value,"<");
        return this;
    }
    public SqlFilterClauses lessOrEqualThan(String columnName,Object value){
        appendConditionToClause(columnName,value,"<=");
        return this;
    }
    public SqlFilterClauses lessOrEqualThan(String columnName,Object leftValue,Object rightValue){
        String leftValueFormatted=String.format(leftValue.getClass()==String.class ? "'%s'":"%s",leftValue);
        String rightValueValueFormatted=String.format(leftValue.getClass()==String.class ? "'%s'":"%s",rightValue);
        appendStatementToCurrentClauseBuilder(String.format("%s %s BETWEEN %s",columnName,leftValueFormatted,rightValueValueFormatted));
        return this;
    }
    public SqlFilterClauses like(String columnName,String stringPattern){
        appendStatementToCurrentClauseBuilder(String.format("%s LIKE %s",columnName,stringPattern));
        return this;
    }
    public SqlFilterClauses in(String columnName,Object ...values){
        StringBuilder valuesBuilder=new StringBuilder();

        for (Object value:
             values) {
            String valueFormatted=String.format(value.getClass()==String.class ? "'%s'":"%s",value);
            valuesBuilder.append(valueFormatted).append(", ");
        }
        appendStatementToCurrentClauseBuilder(String.format("%s IN (%s)",columnName, valuesBuilder));
        return this;
    }
    private void appendConditionToClause(String columnName,Object value,String operator){
        String valueFormat= value.getClass()==String.class ? "'%s'":"%s";
        appendStatementToCurrentClauseBuilder(String.format("%s %s"+valueFormat,columnName,operator,value));
    }
    private void appendStatementToCurrentClauseBuilder(String statement){
        StringBuilder currentClauseBuilder=null;
        switch (currentFilterClause){
            case WHERE -> currentClauseBuilder=whereClause;
            case HAVING -> currentClauseBuilder=havingClause;
        }
        currentClauseBuilder.append(statement);
    }
    private void initWhereClause(){
        if(whereClause==null){
            whereClause=new StringBuilder("WHERE ");
        }

    }

//    SELECT <columns>	5.
//    FROM <table>	1.
//    WHERE <predicate on rows>	2.
//    GROUP BY <columns>	3.
//    HAVING <predicate on groups>	4.
//    ORDER BY <columns>	6.
//    OFFSET	7.
//    FETCH FIRST	8.
    public String buildFilterClausePart(){
        StringBuilder filterBuilder=new StringBuilder();



    }

}


