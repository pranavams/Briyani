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
		try {
			return Customer.builder().build().transformEntities(repository.findAll());
		} catch (Exception ex) {
			throw new RuntimeException("Customer Not Found", ex);
		}
	}

	public Customer save(Customer object) {
		try {
			return Customer.builder().build().transformEntities(this.repository.save(object.createEntity()));
		} catch (Exception ex) {
			throw new RuntimeException("Customer Not Saved", ex);
		}
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
		try {
			return Customer.builder().build().transformEntities(repository.findRecent());
		} catch (Exception ex) {
			throw new RuntimeException("Customer Not Found", ex);
		}
	}

	public Customer get(String id) {
		try {
			return Customer.builder().build()
					.transformEntities(repository.findById(Customer.builder().id(id).build().DBID()).get());
		} catch (Exception ex) {
			throw new RuntimeException("Customer Not Found", ex);
		}
	}

	public Customer update(Customer object) {
		try {
			return Customer.builder().build().transformEntities(this.repository.saveAndFlush(getByID(object)));
		} catch (Exception ex) {
			throw new RuntimeException("Customer Not Found", ex);
		}
	}

	private CustomerEntity getByID(Customer object) {
		return repository.findById(Customer.builder().id(object.getId()).build().DBID()).get();
	}

}
