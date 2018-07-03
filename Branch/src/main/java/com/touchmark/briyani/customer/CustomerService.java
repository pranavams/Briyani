package com.touchmark.briyani.customer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	
}
