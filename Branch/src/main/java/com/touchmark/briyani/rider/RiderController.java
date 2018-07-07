package com.touchmark.briyani.rider;

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
@RequestMapping(path = "/api/v1/rider/")
// @PreAuthorize("hasAuthority('STANDARD_USER')")
public class RiderController {

	private RiderService service;

	@Autowired
	public RiderController(RiderService service) {
		this.service = service;
	}

	@GetMapping
	@RequestMapping("/listAll")
	public ResponseEntity<RiderResponse> getAll() {
		return ResponseEntity.ok(RiderResponse.builder().rider(this.service.getAll()).build());
	}

	@PostMapping
	@RequestMapping("/save")
	public ResponseEntity<RiderEntity> saveBranch(@RequestBody Rider object) {
		RiderEntity created = this.service.save(object);
		return ResponseEntity.ok(created);
	}

	@GetMapping
	@RequestMapping(path = "/delete", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> delete(@RequestParam(name = "id") String id) {
		return ResponseEntity.ok(this.service.delete(id));
	}

	@GetMapping
	@RequestMapping("/listRecent")
	public ResponseEntity<RiderResponse> getRecent() {
		return ResponseEntity.ok(RiderResponse.builder().rider(this.service.getRecent()).build());
	}

	@GetMapping
	@RequestMapping("/get/{id}")
	public ResponseEntity<RiderResponse> get(@PathVariable("id") String id) {
		return ResponseEntity.ok(RiderResponse.builder().rider(Arrays.asList(this.service.get(id))).build());
	}
}
