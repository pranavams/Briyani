package com.touchmark.briyani.rider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/")
public class RiderController {

	private RiderService riderService;

	@Autowired
	public RiderController(RiderService branchService) {
		this.riderService = branchService;
	}

	@GetMapping
	@RequestMapping("/listAll")
	public ResponseEntity<RiderResponse> getAllBranch() {
		return ResponseEntity.ok(RiderResponse.builder().rider(this.riderService.getAllBranch()).build());
	}

	@PostMapping
	@RequestMapping("/save")
	public ResponseEntity<RiderEntity> saveBranch(@RequestBody Rider branch) {
		RiderEntity createdBranch = this.riderService.saveBranch(branch);
		return ResponseEntity.ok(createdBranch);
	}

}
