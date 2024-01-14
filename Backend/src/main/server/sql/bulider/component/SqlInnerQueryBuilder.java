package main.server.sql.bulider.component;

public class SqlInnerQueryBuilder {

	public static String build(SqlQueryDirector innerQuery, String as) {
		return String.format("( %s ) AS %s", innerQuery.build(), as);
	}
}
