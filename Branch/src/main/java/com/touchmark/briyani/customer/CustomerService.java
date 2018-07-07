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

	public CustomerEntity save(Customer object) {
		return this.repository.save(object.createEntity());
	}

	public String delete(String id) {
		try {
			Long idToDelete = Customer.builder().id(id).build().getDatabaseID();
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
				.transformEntities(repository.findById(Customer.builder().id(id).build().getDatabaseID()).get());
	}

}
