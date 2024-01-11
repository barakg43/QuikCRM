package main.server.sql.bulider.component;

public enum eJoinType {

	INNER("INNER JOIN"),
	LEFT_OUTER("LEFT JOIN"),
	RIGHT_OUTER("RIGHT JOIN"),
	FULL_OUTER("LEFT JOIN");

	final private String clauseString;

	eJoinType(String clauseString) {
		this.clauseString = clauseString;
	}

	@Override
	public String toString() {
		return clauseString;
	}

}
