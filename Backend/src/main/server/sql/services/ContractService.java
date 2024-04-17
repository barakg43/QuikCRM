package main.server.sql.services;

import jakarta.transaction.Transactional;
import main.server.sql.bulider.SqlQueryBuilder;
import main.server.sql.dto.reminder.ContractRecord;
import main.server.sql.dto.reminder.InvoiceReminderRecord;
import main.server.sql.dto.reminder.ProductReminderRecord;
import main.server.sql.dto.reminder.ePeriodKind;
import main.server.sql.entities.CustomerEntity;
import main.server.sql.entities.ServiceContractEntity;
import main.server.sql.function.SqlFunctionExecutor;
import main.server.sql.repositories.CustomerRepository;
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
	private final CustomerRepository customerRepository;

	public ContractService(SqlFunctionExecutor sqlFunctionExecutor,
						   ServiceContractRepository serviceContractRepository,
						   CustomerRepository customerRepository) {
		this.sqlFunctionExecutor = sqlFunctionExecutor;
		this.serviceContractRepository = serviceContractRepository;
		this.customerRepository = customerRepository;
	}

	public List<ProductReminderRecord> getRenews() {
		return sqlFunctionExecutor.executeTableValueFunction("fncSystemsDetailsForDate", ProductReminderRecord.class,
				LocalDateTime.now());

	}

	public List<ContractRecord> getServiceRenewRemindersInPeriodTime(int monthsAfterExpiration,
																	 int daysBeforeExpiration) {

//        ( SELECT     TOP 100 PERCENT ReminderID, DateOfReminder, TimeOfReminder, ReminderRemark, Closed,
//        ResponsibleUserName
//        FROM         dbo.tbReminders
//        WHERE     (Closed = 0) AND (DateOfReminder < DATEADD(day, 1, @Date))
//        ORDER BY DateOfReminder, TimeOfReminder )
//		String sqlQuery = SqlQueryBuilder.getNewBuilder()
//				.from("dbo.tbReminders")
//				.select("ReminderID", "DateOfReminder", "TimeOfReminder", "ReminderRemark", "Closed",
//						"ResponsibleUserName")
//				.where().equal("Closed", 0, false).and().lessOrEqualThan("DateOfReminder", ePeriodKind.now(),
//						true)
//				.orderBy(new String[]{"DateOfReminder", "TimeOfReminder"})
//				.build();
//		return sqlFunctionExecutor.supplyTableValueQuery(sqlQuery, ServiceRenewReminderRecord.class);
////        return sqlFunctionExecutor.executeTableValueFunction("fncReminders", ServiceRenewReminderRecord.class,
////        LocalDateTime.now());
		return serviceContractRepository.getAllContractsRenewReminderInPeriodTime(
				UtilityFunctions.postDateByMonthAmount(LocalDate.now(), -monthsAfterExpiration),
				UtilityFunctions.postDateByDaysAmount(LocalDate.now(), -daysBeforeExpiration)
		);
	}

	@Transactional
	public void updateContract(Long contractId, ContractRecord contractRecord) throws IndexOutOfBoundsException,
			IllegalArgumentException {
		ServiceContractEntity serviceContractEntity = serviceContractRepository
				.getContractByContractID(contractId);
		if (serviceContractEntity == null)
			throw new IndexOutOfBoundsException();
		serviceContractEntity.setContractPrice(contractRecord.contractPrice());
		serviceContractEntity.setContactDescription(contractRecord.contactDescription());
		serviceContractEntity.setPeriodKind(contractRecord.periodKind());
		serviceContractEntity.setStartDateOfContract(contractRecord.startDateOfContract());
		setContactFinishDateBaseOnStartDayForContract(contractRecord.periodKind(), serviceContractEntity,
				contractRecord.startDateOfContract());
		validAndSaveToRepository(serviceContractEntity);

	}

	public Short addNewContract(ContractRecord contractRecord) throws IllegalStateException, IllegalArgumentException {
		ServiceContractEntity serviceContractEntity = new ServiceContractEntity();
		if (customerRepository.existsById(contractRecord.customerID())) {
			CustomerEntity customerEntity = customerRepository.getReferenceById(contractRecord.customerID());

			if (customerEntity.getActiveContractID() != null) {
				throw new IllegalStateException("the customer already have active contact");
			}
			serviceContractEntity.setCustomerID(contractRecord.customerID());
			serviceContractEntity.setContractPrice(contractRecord.contractPrice());
			serviceContractEntity.setContactDescription(contractRecord.contactDescription());
			serviceContractEntity.setPeriodKind(contractRecord.periodKind());
			serviceContractEntity.setStartDateOfContract(contractRecord.startDateOfContract());
			setContactFinishDateBaseOnStartDayForContract(contractRecord.periodKind(), serviceContractEntity,
					contractRecord.startDateOfContract());
			CustomerEntity savedUpdatedCustomer = saveContractAndUpdateActiveContractInCustomer(serviceContractEntity);
			return savedUpdatedCustomer.getCustomerID();
		} else {
			throw new IllegalArgumentException("customer with this id not exist");
		}


	}

	@Transactional
	public void deleteContractByID(Long contractID) throws IndexOutOfBoundsException {

		if (serviceContractRepository.existsById(contractID))
			serviceContractRepository.deleteById(contractID);
		else
			throw new IndexOutOfBoundsException();

	}

	@Transactional
	public void setContactReminderState(Long contactID, boolean toEnable) throws IndexOutOfBoundsException {
		ServiceContractEntity serviceContractEntity = serviceContractRepository
				.getContractByContractID(contactID);
		if (serviceContractEntity == null)
			throw new IndexOutOfBoundsException();
		if (toEnable) {
			setContactFinishDateBaseOnStartDayForContract(serviceContractEntity.getPeriodKind(), serviceContractEntity,
					serviceContractEntity.getStartDateOfContract());
		} else {
			serviceContractEntity.setFinishDateOfContract(null);
		}

	}

	@Transactional
	public void renewContractForPeriod(Long contractId, ContractRecord contractRecord) throws IndexOutOfBoundsException, IllegalArgumentException {
		//close the current contract
		ServiceContractEntity currentContract =
				serviceContractRepository.getContractByContractID(contractId);
		if (currentContract == null)
			throw new IndexOutOfBoundsException();
		currentContract.setRenewed(true);
		currentContract.setContractPrice(contractRecord.contractPrice());
		currentContract.setContactDescription(contractRecord.contactDescription());
		//create new contract
		ServiceContractEntity newContract = new ServiceContractEntity();
		newContract.setCustomerID(currentContract.getCustomerID());
//		newContract.setCustomer(currentContract.getCustomer());
		Timestamp startDateForNewContract =
				UtilityFunctions.postDateByDaysAmount(currentContract.getFinishDateOfContract(), 1);
		newContract.setStartDateOfContract(startDateForNewContract);
		setContactFinishDateBaseOnStartDayForContract(contractRecord.periodKind(), newContract,
				startDateForNewContract);
		newContract.setContractPrice(contractRecord.contractPrice());
		newContract.setPeriodKind(contractRecord.periodKind());
		UtilityFunctions.validEntityValidations(currentContract);
		validAndSaveToRepository(currentContract);
		saveContractAndUpdateActiveContractInCustomer(newContract);
	}

	private CustomerEntity saveContractAndUpdateActiveContractInCustomer(ServiceContractEntity newContract) {
		UtilityFunctions.validEntityValidations(newContract);
		ServiceContractEntity savedContract = validAndSaveToRepository(newContract);
		CustomerEntity customerToUpdate = customerRepository.getReferenceById(savedContract.getCustomerID());
		customerToUpdate.setActiveContractID(savedContract.getContractID());
		return customerRepository.save(customerToUpdate);
	}

	private void setContactFinishDateBaseOnStartDayForContract(ePeriodKind periodKind,
															   ServiceContractEntity newContract,
															   Timestamp startDateForNewContract) {
		int periodInMonths = periodKind.getMonthsPeriod();
		newContract.setFinishDateOfContract(UtilityFunctions.postDateByMonthAmount(startDateForNewContract,
				periodInMonths));
	}

	private ServiceContractEntity validAndSaveToRepository(ServiceContractEntity serviceContractEntity) {
		UtilityFunctions.validEntityValidations(serviceContractEntity);
		return serviceContractRepository.save(serviceContractEntity);
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
