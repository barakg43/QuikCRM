package main.server.sql.services;

import main.server.sql.bulider.SqlQueryBuilder;
import main.server.sql.dto.reminder.ContractRecord;
import main.server.sql.dto.reminder.InvoiceReminderRecord;
import main.server.sql.dto.reminder.RenewReminderRecord;
import main.server.sql.entities.ServiceContract;
import main.server.sql.function.SqlFunctionExecutor;
import main.server.sql.repositories.ServiceContractRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public class ServiceContractService {
	private final SqlFunctionExecutor sqlFunctionExecutor;
	private final ServiceContractRepository serviceContractRepository;

	public ServiceContractService(SqlFunctionExecutor sqlFunctionExecutor,
								  ServiceContractRepository serviceContractRepository) {
		this.sqlFunctionExecutor = sqlFunctionExecutor;
		this.serviceContractRepository = serviceContractRepository;
	}

	public List<RenewReminderRecord> getRenews() {
		return sqlFunctionExecutor.executeTableValueFunction("fncSystemsDetailsForDate", RenewReminderRecord.class,
				LocalDateTime.now());

	}

	public List<ContractRecord> getServiceRenewReminders(int monthsAfterExpiration, int daysBeforeExpiration) {

//        ( SELECT     TOP 100 PERCENT ReminderID, DateOfReminder, TimeOfReminder, ReminderRemark, Closed,
//        ResponsibleUserName
//        FROM         dbo.tbReminders
//        WHERE     (Closed = 0) AND (DateOfReminder < DATEADD(day, 1, @Date))
//        ORDER BY DateOfReminder, TimeOfReminder )
//		String sqlQuery = SqlQueryBuilder.getNewBuilder()
//				.from("dbo.tbReminders")
//				.select("ReminderID", "DateOfReminder", "TimeOfReminder", "ReminderRemark", "Closed",
//						"ResponsibleUserName")
//				.where().equal("Closed", 0, false).and().lessOrEqualThan("DateOfReminder", LocalDate.now(),
//						true)
//				.orderBy(new String[]{"DateOfReminder", "TimeOfReminder"})
//				.build();
//		return sqlFunctionExecutor.supplyTableValueQuery(sqlQuery, ServiceRenewReminderRecord.class);
////        return sqlFunctionExecutor.executeTableValueFunction("fncReminders", ServiceRenewReminderRecord.class,
////        LocalDateTime.now());
		return serviceContractRepository.getAllContractsRenewReminder(Timestamp.valueOf(LocalDate.now().plusMonths(-monthsAfterExpiration).atStartOfDay()),
				Timestamp.valueOf(LocalDate.now().plusDays(daysBeforeExpiration).atStartOfDay()));
	}

	public void updateContract(ContractRecord contractRecord) {
		ServiceContract serviceContract = serviceContractRepository
				.getContractByContractID(contractRecord.contractID());
		serviceContract.setContractPrice(contractRecord.contractPrice());
		serviceContract.setContactDescription(contractRecord.contactDescription());
		serviceContract.setPeriodKind(contractRecord.periodKind());
		serviceContract.setFinishDateOfContract(contractRecord.finishDateOfContract());
		serviceContract.setStartDateOfContract(contractRecord.startDateOfContract());
		serviceContractRepository.save(serviceContract);
	}

	public void addNewContract(ContractRecord contractRecord) {
		ServiceContract serviceContract = new ServiceContract();
		serviceContract.setCustomerID(contractRecord.customerID());
		serviceContract.setContractPrice(contractRecord.contractPrice());
		serviceContract.setContactDescription(contractRecord.contactDescription());
		serviceContract.setPeriodKind(contractRecord.periodKind());
//		serviceContract.setFinishDateOfContract(contractRecord.finishDateOfContract());
		serviceContract.setStartDateOfContract(contractRecord.startDateOfContract());
		serviceContractRepository.save(serviceContract);
	}

	public void deleteContract(Long contractID) {
		serviceContractRepository.deleteByContractID(contractID);
	}

	public void renewContractForPeriod(ContractRecord contractRecord) {
		//close the current contract
		ServiceContract currentContract =
				serviceContractRepository.getContractByContractID(contractRecord.contractID());
		currentContract.setRenewed(true);
		currentContract.setContractPrice(contractRecord.contractPrice());
		currentContract.setContactDescription(contractRecord.contactDescription());
		//create new contract
		int periodInMonths = contractRecord.periodKind().getMonthsPeriod();
		ServiceContract newContract = new ServiceContract();
		newContract.setCustomerID(currentContract.getCustomerID());
		Timestamp startDateForNewContract = Timestamp.valueOf(contractRecord.finishDateOfContract()
				.toLocalDateTime()
				.plusDays(1)
				.toLocalDate().atStartOfDay());
		newContract.setStartDateOfContract(startDateForNewContract);
		newContract.setFinishDateOfContract(Timestamp.valueOf(startDateForNewContract.toLocalDateTime().
				plusMonths(periodInMonths).toLocalDate().atStartOfDay()));
		newContract.setPeriodKind(contractRecord.periodKind());
		serviceContractRepository.saveAll(List.of(currentContract, newContract));
	}


	@Deprecated
	public List<InvoiceReminderRecord> getInvoiceReminders() {
//		SELECT     dbo.fncCustNameForActiveContractID(contractID) AS custShortName, contractID, dateOfDebit,
//		invoiceNum, renewal
//		FROM         dbo.tbInvoicesForContracts
//		WHERE     (invoiceNum IS NULL) AND (dateOfDebit < DATEADD(day, 1, @Date))
		String sqlQuery = SqlQueryBuilder.getNewBuilder()
				.from("tbInvoicesForContracts")
				.select("dbo.fncCustNameForActiveContractID(contractID) AS custShortName, contractID, dateOfDebit, " +
						"invoiceNum, renewal")
				.where()
				.is("invoiceNum", "NULL", false)
				.and().lessOrEqualThan("dateOfDebit", LocalDate.now(), true)
				.build();
		System.out.println(sqlQuery);
		return sqlFunctionExecutor.supplyTableValueQuery(sqlQuery, InvoiceReminderRecord.class);

	}
}
