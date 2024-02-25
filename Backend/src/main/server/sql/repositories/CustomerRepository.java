package main.server.sql.repositories;

import main.server.sql.dto.customer.CustomerFullDetailsRecord;
import main.server.sql.dto.customer.CustomerSlimDetailsRecord;
import main.server.sql.entities.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<CustomerEntity, Short> {
	@Query("SELECT new main.server.sql.dto.customer.CustomerSlimDetailsRecord(c.customerID, c.customerShortName, " +
			"c.customerStatus, c.customerMainPhone, c.address, c.city) FROM CustomerEntity c")
	List<CustomerSlimDetailsRecord> findAlLCustomerDetails();

	CustomerFullDetailsRecord getCustomerByCustomerID(int customerID);

}

