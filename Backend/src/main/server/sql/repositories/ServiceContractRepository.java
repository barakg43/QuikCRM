package main.server.sql.repositories;

import main.server.sql.dto.reminder.ContractRecord;
import main.server.sql.entities.ServiceContractEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface ServiceContractRepository extends JpaRepository<ServiceContractEntity, Long> {

	ServiceContractEntity getContractByContractID(long contractID);

	@Query("SELECT new main.server.sql.dto.reminder.ContractRecord(c.contractID, c.customerID, c.customer" +
			".customerShortName, " +
			"c.startDateOfContract, c.finishDateOfContract, c.contractPrice, c.periodKind, c.contactDescription) " +
			" FROM ServiceContractEntity c WHERE c.renewed = false AND c.finishDateOfContract >= ?1 AND c" +
			".finishDateOfContract <= ?2")
	List<ContractRecord> getAllContractsRenewReminderInPeriodTime(Timestamp minimumDate, Timestamp expirationDate);

	void deleteByContractID(Long contactID);

}
