package com.touchmark.briyani.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.touchmark.briyani.commons.Log;

@RestController
@RequestMapping(path = "/api/v1/order/")
// @PreAuthorize("hasAuthority('STANDARD_USER')")
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
	public ResponseEntity<OrderResponse> getOrdersForCustomer(@PathVariable("id") String id) {
		return ResponseEntity.ok(OrderResponse.builder().order(this.service.getOrdersForCustomer(id)).build());
	}

	@PostMapping
	@RequestMapping(path = "/createOrder", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> createOrder(@RequestBody CreateOrder object) {
		try {
			Log.log("OrderController", "createOrder", "Object Received To Save " + object);
			this.service.createOrder(object);
			return ResponseEntity.ok("");
		} catch (Exception ex) {
			Log.error("OrderController", "createOrder", "Object Creation Failed ", ex);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
		}
	}

	@GetMapping
	@RequestMapping("/listRecent")
	public ResponseEntity<OrderResponse> getRecent() {
		return ResponseEntity.ok(OrderResponse.builder().order(this.service.getRecent()).build());
	}
	
}
