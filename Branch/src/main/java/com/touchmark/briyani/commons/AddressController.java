package com.touchmark.briyani.commons;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/address/")
@PreAuthorize("hasAuthority('BRANCH_USER')")
public class AddressController {

	private AddressRepository repo;

	@Autowired
	public AddressController(AddressRepository repo) {
		this.repo = repo;
	}

	@GetMapping
	@RequestMapping("/listAll")
	@PreAuthorize("hasAuthority('BRANCH_USER')")
	public ResponseEntity<List<AddressEntity>> getAll() {
		return ResponseEntity.ok(this.repo.findAll());
	}
}
