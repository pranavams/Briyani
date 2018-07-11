package com.touchmark.briyani.statistics;

import java.time.LocalDate;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/statistics/")
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
	
	@GetMapping
	@RequestMapping("/dateWiseConsolidatedListForBranch/{id}")
	public ResponseEntity<Map<LocalDate, Statistics>> getDateWiseConsolidatedOrdersForBranch(@PathVariable("id") String id) {
		return ResponseEntity.ok(this.service.getDateWiseConsolidatedOrdersForBranch(id));
	}
}
