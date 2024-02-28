package main.server.sql.repositories;

import main.server.sql.entities.CustomerEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerPagingRepository extends PagingAndSortingRepository<CustomerEntity, Short> {
	//	@Query("SELECT new main.server.sql.dto.customer.CustomerSlimDetailsRecord(c.customerID, c.customerShortName,
	//	" +
//			"c.customerStatus, c.customerMainPhone, c.address, c.city) FROM CustomerEntity c")
	Page<CustomerEntity> findAlL(Pageable pageable);

}

