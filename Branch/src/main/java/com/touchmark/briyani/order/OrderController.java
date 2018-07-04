package com.touchmark.briyani.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.touchmark.briyani.commons.Log;

@RestController
@RequestMapping(path = "/api/v1/order/")
//@PreAuthorize("hasAuthority('STANDARD_USER')")
public class OrderController {

	private OrderService service;

	@Autowired
	public OrderController(OrderService service) {
		this.service = service;
	}

	@GetMapping
	@RequestMapping("/listAll")
	public ResponseEntity<OrderResponse> getAll() {
		return ResponseEntity.ok(OrderResponse.builder().order(this.service.getAll()).build());
	}

	@GetMapping
	@RequestMapping("/listForCustomer/{id}")
	public ResponseEntity<OrderResponse> getOrdersForCustomer(@PathVariable("id") String id){
		return ResponseEntity.ok(OrderResponse.builder().order(this.service.getOrdersForCustomer(id)).build());		
	}
	
	@PostMapping
	@RequestMapping("/save")
	public ResponseEntity<Order> save(@RequestBody Order object) {
		Log.log("OrderController", "save", "Object Received To Save " + object);
		OrderEntity created = this.service.save(object);
		return ResponseEntity.ok(Order.builder().build().transformEntity(created));
	}

}
