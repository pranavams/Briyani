package com.touchmark.briyani.customer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.touchmark.briyani.commons.Log;

@Service
public class CustomerService {
	private CustomerRepository repository;

	@Autowired
	public CustomerService(CustomerRepository repository) {
		this.repository = repository;
	}

	public List<Customer> getAll() {
		return Customer.builder().build().transformEntities(repository.findAll());
	}

	public Customer save(Customer object) {
		return Customer.builder().build().transformEntities(this.repository.save(object.createEntity()));
	}

	public String delete(String id) {
		try {
			Long idToDelete = Customer.builder().id(id).build().DBID();
			Log.log("CustomerService", "delete", "Customer ID to Delete " + idToDelete + ", " + id);
			this.repository.deleteById(idToDelete);
			return "Customer " + id + " deleted Successfully";
		} catch (Exception ex) {
			Log.error("CustomerService", "Delete", "Customer Not Deleted " + ex, ex);
			return "Failure - Customer Not Deleted";
		}
	}

	public List<Customer> getRecent() {
		return Customer.builder().build().transformEntities(repository.findRecent());
	}

	public Customer get(String id) {
		return Customer.builder().build()
				.transformEntities(repository.findById(Customer.builder().id(id).build().DBID()).get());
	}

	public Customer update(Customer object) {
		CustomerEntity entity = getByID(object);
		entity.updateWith(object);
		return Customer.builder().build().transformEntities(this.repository.saveAndFlush(entity));
	}

	private CustomerEntity getByID(Customer object) {
		try {
			return repository.findById(Customer.builder().id(object.getId()).build().DBID()).get();
		} catch (Exception ex) {
			throw new RuntimeException("Customer Not Found");
		}
	}

}
