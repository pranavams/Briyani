package com.touchmark.briyani.statistics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/statistics/")
@PreAuthorize("hasAuthority('BRANCH_USER')")
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
