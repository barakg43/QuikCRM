package main.server.sql.repositories;

import main.server.sql.dto.customer.CustomerFlatDetailsRecord;
import main.server.sql.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {


	List<CustomerFlatDetailsRecord> findAllBy();

	CustomerFlatDetailsRecord findByCustomerID(Short customerID);

}

