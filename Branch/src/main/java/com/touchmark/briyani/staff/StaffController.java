package com.touchmark.briyani.staff;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/staff/")
//@PreAuthorize("hasAuthority('STANDARD_USER')")
public class StaffController {

	private StaffService service;

	@Autowired
	public StaffController(StaffService service) {
		this.service = service;
	}

	@GetMapping
	@RequestMapping("/listAll")
	public ResponseEntity<StaffResponse> getAll() {
		return ResponseEntity.ok(StaffResponse.builder().staff(this.service.getAll()).build());
	}

	
	@PostMapping
	@RequestMapping(consumes = MediaType.APPLICATION_JSON_VALUE, path = "/save", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<StaffEntity> saveBranch(@RequestBody Staff object) {
		StaffEntity created = this.service.save(object);
		return ResponseEntity.ok(created);
	}

}
