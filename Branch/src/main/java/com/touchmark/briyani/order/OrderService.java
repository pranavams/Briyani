package com.touchmark.briyani.order;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
	private OrderRepository repository;
	
	@Autowired
	public OrderService(OrderRepository repository) {
		this.repository = repository;
	}
	
	public List<Order> getAll() {
		return Order.builder().build().transformEntities(repository.findAll());
	}
	
	public OrderEntity save(Order object) {
		return this.repository.save(object.createEntity());
	}
	
}
