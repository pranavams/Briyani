package com.touchmark.briyani.branch;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.touchmark.briyani.commons.Log;

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
	public ResponseEntity<BranchResponse> getAllBranch() {
		BranchResponse branches = BranchResponse.builder().branch(this.branchService.getAllBranch()).build();
		Log.log("BranchController", "getAllBranch", "Branch To Send " + branches);
		return ResponseEntity.ok(branches);
	}

	@GetMapping
	@RequestMapping("/get/{id}")
	public ResponseEntity<BranchResponse> get(@PathVariable("id") String id) {
		Log.log("BranchController", "get", "Parameter Received " + id);
		BranchResponse branches = BranchResponse.builder().branch(Arrays.asList(this.branchService.get(id))).build();
		Log.log("BranchController", "get", "Branch To Send " + branches);
		return ResponseEntity.ok(branches);
	}

	@PostMapping
	@RequestMapping(consumes = MediaType.APPLICATION_JSON_VALUE, path = "/save", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Branch> saveBranch(@RequestBody Branch branch) {
		branch.validateForCreation();
		Branch createdBranch = this.branchService.saveBranch(branch);
		return ResponseEntity.ok(createdBranch);
	}
	
	@PostMapping
	@RequestMapping(consumes = MediaType.APPLICATION_JSON_VALUE, path = "/update", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Branch> update(@RequestBody Branch object) {
		object.validateForUpdation();
		Branch update = this.branchService.update(object);
		return ResponseEntity.ok(update);
	}


}
