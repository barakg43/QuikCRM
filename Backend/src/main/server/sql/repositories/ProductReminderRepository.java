package main.server.sql.repositories;

import main.server.sql.entities.ProductReminderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface ProductReminderRepository extends JpaRepository<ProductReminderEntity, Short> {
//	SELECT     TOP 100 PERCENT CustomerID, dbo.fncCustShortNameForCustID(CustomerID) AS CustShortName,
////	SystemDetailID, SystemDetailDescription,
////	InternalIP, ExternalIP, UserName, Password, ValidityTill
////	FROM         dbo.tbSystemsDetails
////	WHERE     (ValidityTill < DATEADD(month, 2, @Date))
////	ORDER BY ValidityTill

	List<ProductReminderEntity> findAllByValidityTillBefore(Timestamp validityTill);

}

