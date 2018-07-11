package com.touchmark.briyani.customer;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/customer/")
public class CustomerController {

	private CustomerService service;

	@Autowired
	public CustomerController(CustomerService service) {
		this.service = service;
	}

	@GetMapping
	@RequestMapping("/listAll")
	public ResponseEntity<CustomerResponse> getAll() {
		return ResponseEntity.ok(CustomerResponse.builder().customer(this.service.getAll()).build());
	}

	@GetMapping
	@RequestMapping("/get/{id}")
	public ResponseEntity<CustomerResponse> get(@PathVariable("id") String id) {
		return ResponseEntity.ok(CustomerResponse.builder().customer(Arrays.asList(this.service.get(id))).build());
	}

	@PostMapping
	@RequestMapping(consumes = MediaType.APPLICATION_JSON_VALUE, path = "/save", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Customer> save(@RequestBody Customer object) {
		Customer created = this.service.save(object);
		return ResponseEntity.ok(created);
	}

	@GetMapping
	@RequestMapping(path = "/delete", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> delete(@RequestParam(name = "id") String id) {
		return ResponseEntity.ok(this.service.delete(id));
	}

	@GetMapping
	@RequestMapping("/listRecent")
	public ResponseEntity<CustomerResponse> getRecent() {
		return ResponseEntity.ok(CustomerResponse.builder().customer(this.service.getRecent()).build());
	}

	@PostMapping
	@RequestMapping(consumes = MediaType.APPLICATION_JSON_VALUE, path = "/update", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Customer> update(@RequestBody Customer object) {
		Customer update = this.service.update(object);
		return ResponseEntity.ok(update);
	}
}
