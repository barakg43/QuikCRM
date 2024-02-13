package main.server.sql.repositories;

import main.server.sql.dto.customer.CustomerFullDetailsRecord;
import main.server.sql.dto.customer.CustomerSlimDetailsRecord;
import main.server.sql.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {


	//
	@Query("SELECT c FROM Customer c")
	List<CustomerSlimDetailsRecord> findAlCustomerDetails();

	CustomerFullDetailsRecord getCustomerByCustomerID(int customerID);

}

