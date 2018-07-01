package com.touchmark.briyani.rider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/rider/")
public class RiderController {

	private RiderService service;

	@Autowired
	public RiderController(RiderService service) {
		this.service = service;
	}

	@GetMapping
	@RequestMapping("/listAll")
	@PreAuthorize("hasAuthority('STANDARD_USER)")
	public ResponseEntity<RiderResponse> getAll() {
		return ResponseEntity.ok(RiderResponse.builder().rider(this.service.getAll()).build());
	}

	@PostMapping
	@RequestMapping("/save")
	@PreAuthorize("hasAuthority('STANDARD_USER)")
	public ResponseEntity<RiderEntity> saveBranch(@RequestBody Rider object) {
		RiderEntity created = this.service.save(object);
		return ResponseEntity.ok(created);
	}

}
