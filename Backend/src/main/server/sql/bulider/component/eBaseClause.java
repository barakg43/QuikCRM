package main.server.sql.bulider.component;


public enum eBaseClause {
//    SELECT @CustShortName = customerShortName
//    FROM tbCustomers

	SELECT("""
			SELECT %s\s
			FROM %%s %s\s
			 %%s\s"""),

//	SELECT("""
//			SELECT %s\s
//			FROM %%%s %%s\s
//			 %%%s\s"""),

//    INSERT tbConnectionPriceQuotesDetails (
////            PQSDetailsID,
////            PQCDetailsID)
////    VALUES (
////            @PQSDetailsID,
////            @PQCDetailsID)

	INSERT("""
			INSERT INTO %%s (\s
			\t\t%s\s"""),


	//    UPDATE tbInvoicesForContracts
//    SET dateOfDebit = DATEADD(MONTH, @MonthAmount, dateOfDebit)
	UPDATE("""
			UPDATE %%s\s
			\t\tSET %s\s
			"""),
	//    DELETE
//    FROM tbConnectionPriceQuotesDetails
	DELETE("""
			DELETE %s\s
			\t\tFROM %%s
			""");


	final private String clauseString;

	eBaseClause(String clauseString) {
		this.clauseString = clauseString;
	}

	public String getClauseFormatString() {
		return clauseString;
	}
}
