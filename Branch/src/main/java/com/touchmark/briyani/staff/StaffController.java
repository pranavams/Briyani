package com.touchmark.briyani.staff;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/staff/")
@PreAuthorize("hasAuthority('BRANCH_USER')")
public class StaffController {

	private StaffService service;

	@Autowired
	public StaffController(StaffService service) {
		this.service = service;
	}

	@GetMapping
	@RequestMapping("/listAll")
	@PreAuthorize("hasAuthority('BRANCH_USER')")
	public ResponseEntity<StaffResponse> getAll() {
		return ResponseEntity.ok(StaffResponse.builder().staff(this.service.getAll()).build());
	}

	@GetMapping
	@RequestMapping("/listRecent")
	@PreAuthorize("hasAuthority('BRANCH_USER')")
	public ResponseEntity<StaffResponse> getRecent() {
		return ResponseEntity.ok(StaffResponse.builder().staff(this.service.getRecent()).build());
	}
	
	@PostMapping
	@RequestMapping(consumes = MediaType.APPLICATION_JSON_VALUE, path = "/save", produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('BRANCH_MANAGER')")
	public ResponseEntity<Staff> save(@RequestBody Staff object) {
		object.validateForCreation();
		Staff created = this.service.save(object);
		return ResponseEntity.ok(created);
	}

	@GetMapping
	@RequestMapping(path = "/delete", produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('BRANCH_MANAGER')")
	public ResponseEntity<String> delete(@RequestParam(name="id") String id) {
		return ResponseEntity.ok(this.service.delete(id));
	}

	@GetMapping
	@RequestMapping("/get/{id}")
	@PreAuthorize("hasAuthority('BRANCH_USER')")
	public ResponseEntity<StaffResponse> get(@PathVariable("id") String id) {
		return ResponseEntity.ok(StaffResponse.builder().staff(Arrays.asList(this.service.get(id))).build());
	}
	
	@PostMapping
	@RequestMapping(consumes = MediaType.APPLICATION_JSON_VALUE, path = "/update", produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('BRANCH_MANAGER')")
	public ResponseEntity<Staff> update(@RequestBody Staff object) {
		object.validateForUpdation();
		Staff update = this.service.update(object);
		return ResponseEntity.ok(update);
	}

}
