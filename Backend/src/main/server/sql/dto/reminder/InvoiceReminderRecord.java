package main.server.sql.dto.reminder;

import lombok.Data;

import java.sql.Date;

@Data
public class InvoiceReminderRecord {

	private String custShortName, invoiceNum, contractID;
	private Date dateOfDebit;
	private Integer renewal;

}
