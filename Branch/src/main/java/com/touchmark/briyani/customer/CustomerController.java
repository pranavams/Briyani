package com.touchmark.briyani.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
	//@PreAuthorize("hasAuthority('STANDARD_USER')")
	public ResponseEntity<CustomerResponse> getAll() {
		return ResponseEntity.ok(CustomerResponse.builder().customer(this.service.getAll()).build());
	}

	@PostMapping
	@RequestMapping("/save")
	//@PreAuthorize("hasAuthority('STANDARD_USER')")
	public ResponseEntity<CustomerEntity> saveBranch(@RequestBody Customer object) {
		CustomerEntity created = this.service.save(object);
		return ResponseEntity.ok(created);
	}

}
