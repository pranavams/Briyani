package com.touchmark.briyani.branch;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.touchmark.briyani.commons.Log;

@RestController
@RequestMapping(path = "/api/v1/branch/")
//@PreAuthorize("hasAuthority('STANDARD_USER')")
public class BranchController {

	private BranchService branchService;

	@Autowired
	public BranchController(BranchService branchService) {
		this.branchService = branchService;
	}

	@GetMapping
	@RequestMapping("/listAll")
	public ResponseEntity<BranchResponse> getAllBranch() {
		BranchResponse branches = BranchResponse.builder().branch(this.branchService.getAllBranch()).build();
		Log.log("BranchController", "getAllBranch", "Branch To Send " + branches);
		return ResponseEntity.ok(branches);
	}

	@PostMapping
	@RequestMapping(consumes = MediaType.APPLICATION_JSON_VALUE, path = "/save", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<BranchEntity> saveBranch(@RequestBody Branch branch) {
		BranchEntity createdBranch = this.branchService.saveBranch(branch);
		return ResponseEntity.ok(createdBranch);
	}

}
