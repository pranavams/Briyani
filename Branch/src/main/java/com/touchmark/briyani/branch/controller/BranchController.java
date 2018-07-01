package com.touchmark.briyani.branch.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.touchmark.briyani.branch.biz.BranchService;
import com.touchmark.briyani.branch.bo.Branch;
import com.touchmark.briyani.branch.entities.BranchEntity;

@RestController
@RequestMapping(path = "/api/v1/")
public class BranchController {

	private BranchService branchService;

	@Autowired
	public BranchController(BranchService branchService) {
		this.branchService = branchService;
	}

	@GetMapping
	@RequestMapping("/listAll")
	public ResponseEntity<BranchResponse> getAllBranch() {
		return ResponseEntity.ok(BranchResponse.builder().branch(this.branchService.getAllBranch()).build());
	}

	@PostMapping
	@RequestMapping("/save")
	public ResponseEntity<BranchEntity> saveBranch(@RequestBody Branch branch) {
		BranchEntity createdBranch = this.branchService.saveBranch(branch);
		return ResponseEntity.ok(createdBranch);
	}

}
