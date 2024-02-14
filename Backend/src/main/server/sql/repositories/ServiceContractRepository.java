package main.server.sql.repositories;

import main.server.sql.dto.reminder.ContractRecord;
import main.server.sql.entities.ServiceContract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface ServiceContractRepository extends JpaRepository<ServiceContract, Long> {

	ServiceContract getContractByContractID(long contractID);

	@Query("SELECT new main.server.sql.dto.reminder.ContractRecord(c.contractID, c.customerID, c.customer" +
			".customerShortName, " +
			"c.startDateOfContract, c.finishDateOfContract, c.contractPrice, c.periodKind, c.contactDescription) " +
			" FROM ServiceContract c WHERE c.renewed = false AND c.finishDateOfContract >= ?1 AND c" +
			".finishDateOfContract <= ?2")
	List<ContractRecord> getAllContractsRenewReminder(Timestamp minimumDate, Timestamp expirationDate);

	void deleteByContractID(Long contactID);

}
