package main.server.sql.services;

import jakarta.transaction.Transactional;
import main.server.sql.dto.ListSubset;
import main.server.sql.dto.customer.CustomerFullDetailsRecord;
import main.server.sql.dto.customer.CustomerSlimDetailsRecord;
import main.server.sql.entities.CustomerEntity;
import main.server.sql.repositories.CustomerRepository;
import main.server.uilities.UtilityFunctions;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {
	private final CustomerRepository customerRepository;

	public CustomerService(CustomerRepository customerRepository) {
		this.customerRepository = customerRepository;
	}

	public ListSubset<CustomerSlimDetailsRecord> getSubsetOfCustomers(Integer pageNumber, Integer pageSize) {
		Page<CustomerEntity> customerListEntities;
		if (pageSize != null && pageNumber != null)
			customerListEntities = customerRepository.findAll(PageRequest.of(pageNumber, pageSize));
		else //get all entities
			customerListEntities = customerRepository.findAll(Pageable.unpaged());
		List<CustomerSlimDetailsRecord> customerList =
				customerListEntities.stream().map(CustomerSlimDetailsRecord::new).toList();
		long totalItemInDb = getCustomersAmount();
		return new ListSubset<>(customerList, totalItemInDb);

	}

	public Short addNewCustomer(CustomerFullDetailsRecord customerDetails) throws IllegalArgumentException {
		CustomerEntity customer = new CustomerEntity(customerDetails);
		CustomerEntity customerSaved = validAndSaveToRepository(customer);
		return customerSaved.getCustomerID();
	}

	@Transactional
	public void updateCustomerDetails(Short customerId, CustomerFullDetailsRecord customerDetailsUpdated) throws IndexOutOfBoundsException {

		Optional<CustomerEntity> customerToUpdatedOptional = customerRepository.findById(customerId);
		if (customerToUpdatedOptional.isEmpty())
			throw new IndexOutOfBoundsException("CustomerEntity with id " + customerId + " " +
					"not " +
					"exist!");


		CustomerEntity customerToUpdated = customerToUpdatedOptional.get();
		customerToUpdated.copyFieldsFromCustomerRecord(customerDetailsUpdated);
		validAndSaveToRepository(customerToUpdated);
	}

	private CustomerEntity validAndSaveToRepository(CustomerEntity customerEntityToSave) {
		UtilityFunctions.validEntityValidations(customerEntityToSave);
		return customerRepository.save(customerEntityToSave);
	}

	public CustomerFullDetailsRecord getFullCustomerDetailsForId(int id) {
		return customerRepository.getCustomerByCustomerID(id);
	}

	@Transactional
	public void deleteCustomer(short id) throws IndexOutOfBoundsException {
		if (customerRepository.existsById(id))
			customerRepository.deleteById(id);
		else
			throw new IndexOutOfBoundsException();

	}

	private long getCustomersAmount() {
		return customerRepository.count();
	}
}
