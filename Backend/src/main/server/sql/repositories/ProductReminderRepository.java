package main.server.sql.repositories;

import main.server.sql.dto.reminder.ProductReminderRecord;
import main.server.sql.entities.ProductReminderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

@Repository
public interface ProductReminderRepository extends JpaRepository<ProductReminderEntity, BigDecimal> {
//	SELECT     TOP 100 PERCENT CustomerID, dbo.fncCustShortNameForCustID(CustomerID) AS CustShortName,
////	SystemDetailID, SystemDetailDescription,
////	InternalIP, ExternalIP, UserName, Password, ValidityTill
////	FROM         dbo.tbSystemsDetails
////	WHERE     (ValidityTill < DATEADD(month, 2, @Date))
////	ORDER BY ValidityTill

	List<ProductReminderEntity> findAllByValidityTillBefore(Timestamp validityTill);

	@Query("SELECT new main.server.sql.dto.reminder.ProductReminderRecord(p.customerID, " +
			"p.customer.customerShortName ," +
			"p.id " +
			",p.systemDetailDescription, " +
			"p.internalIP, " +
			"p.externalIP," +
			" p.userName," +
			" p.password, " +
			"p.validityTill) FROM ProductReminderEntity p WHERE p.customerID = :customerID")
	List<ProductReminderRecord> findAllByCustomer_CustomerID(Short customerID);


}

