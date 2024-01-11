package main.server.sql.bulider.component;

import java.util.Map;

public class SqlBaseClauses {
    Map<String, Integer> map = Map.ofEntries(
            Map.entry("A", 1),
            Map.entry("B", 2),
            Map.entry("C", 3),
            Map.entry("D", 4),
            Map.entry("E", 5),
            Map.entry("F", 6),
            Map.entry("G", 7),
            Map.entry("H", 8),
            Map.entry("I", 9),
            Map.entry("J", 10),
            Map.entry("K", 11),
            Map.entry("L", 12)
    );
    protected BaseClause baseClause=null;
    protected final StringBuilder additionalParameters=new StringBuilder();
    private final String parameterDelimiter =", ";
    private final SqlFilterClauses sqlFilterClauses;

    public SqlBaseClauses(SqlFilterClauses sqlFilterClauses) {
        this.sqlFilterClauses = sqlFilterClauses;
    }

    public SqlFilterClauses select(String... columnNames) {
        baseClauseDuplicateValidation();
        baseClause = BaseClause.SELECT;

        for (String columnName:columnNames) {
            additionalParameters.append(columnName).append(parameterDelimiter);
        }
        if(additionalParameters.length()>=2)
            additionalParameters.delete(additionalParameters.length()-2,additionalParameters.length());
        return sqlFilterClauses;
    }
//    BEGIN TRANSACTION
//    INSERT tbConnectionPriceQuotesDetails (
//            PQSDetailsID,
//            PQCDetailsID)
//    VALUES (
//            @PQSDetailsID,
//            @PQCDetailsID)
//    IF @@error <> 0
//    BEGIN
//    ROLLBACK TRAN
//    RETURN
//            END
//
//    COMMIT TRANSACTION


    public SqlFilterClauses insert(Map<String,Object> columnValues){
        baseClauseDuplicateValidation();
        baseClause = BaseClause.INSERT;
        StringBuilder columnNamesParameters=new StringBuilder("(");
        StringBuilder valuesParameters=new StringBuilder("(");
        for (Map.Entry<String,Object> columnEntry:columnValues.entrySet()) {
            columnNamesParameters.append(columnEntry.getKey()).append(parameterDelimiter);
            valuesParameters.append(columnEntry.getValue()).append(parameterDelimiter);
        }
        columnNamesParameters.append(")");
        valuesParameters.append(")");
        additionalParameters.append(columnNamesParameters).append(" VALUES ").append(valuesParameters);
        return sqlFilterClauses;
    }
    /*
    * BEGIN TRANSACTION

	UPDATE tbInvoicesForContracts
    SET dateOfDebit = DATEADD(MONTH, @MonthAmount, dateOfDebit)
    WHERE id = @ID

		IF @@error <> 0
			BEGIN
				ROLLBACK TRAN
				RETURN
			END

COMMIT TRANSACTION

*/
    public SqlFilterClauses update(Map<String,Object> columnValues){
        baseClauseDuplicateValidation();
        baseClause = BaseClause.UPDATE;
        for (Map.Entry<String,Object> columnEntry:columnValues.entrySet()) {
            additionalParameters.append(columnEntry.getKey()).append(" = ").append(columnEntry.getValue()).append(parameterDelimiter);
        }
        return sqlFilterClauses;
    }
//    BEGIN TRANSACTION
//
//    DELETE
//    FROM tbConnectionPriceQuotesDetails
//    WHERE PQSDetailsID = @PQSDetailsID
//            AND PQCDetailsID = @PQCDetailsID
//
//    IF @@error <> 0
//    BEGIN
//    ROLLBACK TRAN
//    RETURN
//            END
//
//    COMMIT TRANSACTION

    public SqlFilterClauses delete(){
        baseClauseDuplicateValidation();
        baseClause = BaseClause.DELETE;
        return sqlFilterClauses;
    }


    private  void baseClauseDuplicateValidation(){
        if(baseClause!=null)
            throw new RuntimeException("Cant select 2 clauses for same query");
    }
}
