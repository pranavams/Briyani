package com.touchmark.briyani.statistics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/staff/")
//@PreAuthorize("hasAuthority('STANDARD_USER')")
public class StatisticsController {

	private StatisticsService service;

	@Autowired
	public StatisticsController(StatisticsService service) {
		this.service = service;
	}

	@GetMapping
	@RequestMapping("/get")
	public ResponseEntity<Statistics> get() {
		return ResponseEntity.ok(this.service.get());
	}
}
