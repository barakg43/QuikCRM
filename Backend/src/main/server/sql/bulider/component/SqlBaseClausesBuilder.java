package main.server.sql.bulider.component;

public class SqlBaseClausesBuilder extends SqlBaseClauses {

    public SqlBaseClausesBuilder(SqlFilterClauses sqlFilterClauses) {
        super(sqlFilterClauses);
    }

    public String formattedBaseStatementFormat(){
        if(baseClause==null){
            throw new RuntimeException("there are not selection for query clause");
        }
        String baseClauseWithoutFilter=String.format(
                baseClause.getClauseFormatString(),additionalParameters);
//        System.out.println(baseClauseWithoutFilter);
        if(baseClause.equals(BaseClause.SELECT)){
            return baseClauseWithoutFilter;
        }else{
            String test="""
                BEGIN TRANSACTION
                       %s
                       %%s
                    IF @@error <> 0
                    BEGIN
                    ROLLBACK TRAN
                    RETURN
                            END

                COMMIT TRANSACTION""".formatted(baseClauseWithoutFilter);
            System.out.println(test);
            return test;
        }

    }
}
