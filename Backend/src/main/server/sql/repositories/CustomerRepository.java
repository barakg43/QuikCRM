package main.server.sql.repositories;

import main.server.sql.dto.customer.CustomerFullDetailsRecord;
import main.server.sql.entities.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<CustomerEntity, Short> {


	CustomerFullDetailsRecord getCustomerByCustomerID(int customerID);

}

