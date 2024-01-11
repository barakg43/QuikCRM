package main.server.sql.bulider;

import main.server.sql.bulider.component.SqlBaseClauses;
import main.server.sql.bulider.component.SqlBaseClausesBuilder;
import main.server.sql.bulider.component.SqlFilterClausesBuilder;

public class SqlQueryBuilder {


	private final SqlFilterClausesBuilder sqlFilterClausesBuilder;
	private final SqlBaseClausesBuilder sqlBaseClausesBuilder;
	private String tableName = null;

	public SqlQueryBuilder() {
		sqlFilterClausesBuilder = new SqlFilterClausesBuilder(this::buildQuery);
		;
		sqlBaseClausesBuilder = new SqlBaseClausesBuilder(sqlFilterClausesBuilder);
	}

	public SqlBaseClauses from(String tableName) {
		this.tableName = tableName;
		return sqlBaseClausesBuilder;
	}

	//callable only from last step
	private String buildQuery() {
		if (tableName == null)
			throw new RuntimeException("Cannot build query without FROM clause");
		StringBuilder queryBuilder = new StringBuilder();
//		System.out.println(sqlBaseClausesBuilder.formattedBaseStatementFormat());
		String baseClauseWithTableNameAndFilter = String.format(
				sqlBaseClausesBuilder.formattedBaseStatementFormat(),
				tableName, sqlFilterClausesBuilder.buildFilterClausePart());
//        System.out.println(baseClauseWithTableNameAndFilter);


		return baseClauseWithTableNameAndFilter;
	}

}
