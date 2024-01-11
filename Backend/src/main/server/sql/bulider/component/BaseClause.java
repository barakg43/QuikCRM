package main.server.sql.bulider.component;



public enum BaseClause {
//    SELECT @CustShortName = customerShortName
//    FROM tbCustomers

    SELECT("""
            SELECT %s\s
            FROM %%s\s
             %%s\s"""),
//    INSERT tbConnectionPriceQuotesDetails (
////            PQSDetailsID,
////            PQCDetailsID)
////    VALUES (
////            @PQSDetailsID,
////            @PQCDetailsID)

    INSERT("INSERT %%s \n %s"),

//    UPDATE tbInvoicesForContracts
//    SET dateOfDebit = DATEADD(MONTH, @MonthAmount, dateOfDebit)
    UPDATE("UPDATE %%s \n %s"),
    //    DELETE
//    FROM tbConnectionPriceQuotesDetails
    DELETE("DELETE %s\n FROM %%s ")
    ;



    final private String clauseString;

    BaseClause(String clauseString){
        this.clauseString=clauseString;
    }

    public String getClauseFormatString() {
        return clauseString;
    }
}
