package main.server.sql.bulider.component;

public class SqlBaseClausesBuilder extends SqlBaseClauses {

	public SqlBaseClausesBuilder(SqlFilterClauses sqlFilterClauses) {
		super(sqlFilterClauses);
	}

	public String formattedBaseStatementFormat() {
		if (baseClause == null) {
			throw new RuntimeException("there are not selection for query clause");
		}

//        System.out.println(baseClauseWithoutFilter);
		if (baseClause.equals(eBaseClause.SELECT)) {
			return String.format(
					baseClause.getClauseFormatString(), additionalParameters, additionalJoins);
		} else {
			String baseClauseWithoutFilter = String.format(
					baseClause.getClauseFormatString(), additionalParameters);
			//            System.out.println(test);
			return """
					BEGIN TRANSACTION
					       %s\s
					       %%s\s
					    IF @@error <> 0
					    BEGIN
					    ROLLBACK TRAN
					    RETURN
					            END

					COMMIT TRANSACTION""".formatted(baseClauseWithoutFilter);
		}

	}
}
