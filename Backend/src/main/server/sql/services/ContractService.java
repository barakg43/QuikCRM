package main.server.sql.services;

import jakarta.transaction.Transactional;
import main.server.sql.bulider.SqlQueryBuilder;
import main.server.sql.dto.reminder.ContractRecord;
import main.server.sql.dto.reminder.InvoiceReminderRecord;
import main.server.sql.dto.reminder.ProductReminderRecord;
import main.server.sql.dto.reminder.ePeriodKind;
import main.server.sql.entities.ServiceContractEntity;
import main.server.sql.function.SqlFunctionExecutor;
import main.server.sql.repositories.ServiceContractRepository;
import main.server.uilities.UtilityFunctions;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ContractService {
	private final SqlFunctionExecutor sqlFunctionExecutor;
	private final ServiceContractRepository serviceContractRepository;

	public ContractService(SqlFunctionExecutor sqlFunctionExecutor,
						   ServiceContractRepository serviceContractRepository) {
		this.sqlFunctionExecutor = sqlFunctionExecutor;
		this.serviceContractRepository = serviceContractRepository;
	}

	public List<ProductReminderRecord> getRenews() {
		return sqlFunctionExecutor.executeTableValueFunction("fncSystemsDetailsForDate", ProductReminderRecord.class,
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
		return serviceContractRepository.getAllContractsRenewReminder(
				UtilityFunctions.postDateByMonthAmount(LocalDate.now(), -monthsAfterExpiration),
				UtilityFunctions.postDateByDaysAmount(LocalDate.now(), -daysBeforeExpiration)
		);
	}

	@Transactional
	public void updateContract(ContractRecord contractRecord) {
		ServiceContractEntity serviceContractEntity = serviceContractRepository
				.getContractByContractID(contractRecord.contractID());
		serviceContractEntity.setContractPrice(contractRecord.contractPrice());
		serviceContractEntity.setContactDescription(contractRecord.contactDescription());
		serviceContractEntity.setPeriodKind(contractRecord.periodKind());
		serviceContractEntity.setFinishDateOfContract(contractRecord.finishDateOfContract());
		serviceContractEntity.setStartDateOfContract(contractRecord.startDateOfContract());
		serviceContractRepository.save(serviceContractEntity);
	}

	public void addNewContract(ContractRecord contractRecord) {
		ServiceContractEntity serviceContractEntity = new ServiceContractEntity();
		serviceContractEntity.setCustomerID(contractRecord.customerID());
		serviceContractEntity.setContractPrice(contractRecord.contractPrice());
		serviceContractEntity.setContactDescription(contractRecord.contactDescription());
		serviceContractEntity.setPeriodKind(contractRecord.periodKind());
		serviceContractEntity.setFinishDateOfContract(contractRecord.finishDateOfContract());
		serviceContractEntity.setStartDateOfContract(contractRecord.startDateOfContract());
		serviceContractEntity.getCustomer().setActiveContract(serviceContractEntity);
		serviceContractRepository.save(serviceContractEntity);
	}

	@Transactional
	public void deleteContractByID(Long contractID) {
		serviceContractRepository.deleteByContractID(contractID);
	}

	@Transactional
	public void setContactReminderState(Long contactID, boolean toEnable) {
		ServiceContractEntity serviceContractEntity = serviceContractRepository
				.getContractByContractID(contactID);
		if (toEnable) {
			setContactFinishDateBaseOnStartDayForContract(serviceContractEntity.getPeriodKind(), serviceContractEntity,
					serviceContractEntity.getStartDateOfContract());
		} else {
			serviceContractEntity.setFinishDateOfContract(null);
		}

	}

	@Transactional
	public void renewContractForPeriod(ContractRecord contractRecord) {
		//close the current contract
		ServiceContractEntity currentContract =
				serviceContractRepository.getContractByContractID(contractRecord.contractID());
		currentContract.setRenewed(true);
		currentContract.setContractPrice(contractRecord.contractPrice());
		currentContract.setContactDescription(contractRecord.contactDescription());
		//create new contract
		ServiceContractEntity newContract = new ServiceContractEntity();
		newContract.setCustomerID(currentContract.getCustomerID());
		Timestamp startDateForNewContract =
				UtilityFunctions.postDateByDaysAmount(currentContract.getFinishDateOfContract(), 1);
		newContract.setStartDateOfContract(startDateForNewContract);
		setContactFinishDateBaseOnStartDayForContract(contractRecord.periodKind(), newContract,
				startDateForNewContract);
		newContract.setContractPrice(contractRecord.contractPrice());
		newContract.setPeriodKind(contractRecord.periodKind());
		serviceContractRepository.saveAll(List.of(currentContract, newContract));
	}

	private void setContactFinishDateBaseOnStartDayForContract(ePeriodKind periodKind,
															   ServiceContractEntity newContract,
															   Timestamp startDateForNewContract) {
		int periodInMonths = periodKind.getMonthsPeriod();
		newContract.setFinishDateOfContract(UtilityFunctions.postDateByMonthAmount(startDateForNewContract,
				periodInMonths));
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
