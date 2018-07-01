package com.touchmark.briyani.branch;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/branch/")
public class BranchController {

	private BranchService branchService;

	@Autowired
	public BranchController(BranchService branchService) {
		this.branchService = branchService;
	}

	@GetMapping
	@RequestMapping("/listAll")
	//@PreAuthorize("hasAuthority('STANDARD_USER') or hasAuthority('ADMIN_USER')")
	@PreAuthorize("hasAuthority('STANDARD_USER')")
	public ResponseEntity<BranchResponse> getAllBranch() {
		return ResponseEntity.ok(BranchResponse.builder().branch(this.branchService.getAllBranch()).build());
	}

	@PostMapping
	@RequestMapping("/save")
	@PreAuthorize("hasAuthority('STANDARD_USER')")
	public ResponseEntity<BranchEntity> saveBranch(@RequestBody Branch branch) {
		BranchEntity createdBranch = this.branchService.saveBranch(branch);
		return ResponseEntity.ok(createdBranch);
	}

}
