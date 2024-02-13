package main.server.sql.entities;


public enum eCustomerStatus {
	IN_SERVICE("in-service"),
	OUT_OF_SERVICE("out-of-service"),
	BANK_HOURS("bank-hours"),
	CLOUD_SERVER("cloud-server"),
	CLOUD_MAIL("cloud-mail");


	private final String status;

	eCustomerStatus(String status) {
		this.status = status;

	}

	public static eCustomerStatus fromStatus(String status) {
		for (eCustomerStatus v : values())
			if (v.getStatus().equalsIgnoreCase(status)) return v;
		throw new IllegalArgumentException();
	}

	public String getStatus() {
		return status;
	}

	public String toString() {
		return status;
	}
}