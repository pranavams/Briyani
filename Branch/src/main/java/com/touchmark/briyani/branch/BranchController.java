package com.touchmark.briyani.branch;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.touchmark.briyani.commons.Log;
import com.touchmark.briyani.user.User;
import com.touchmark.briyani.user.UserService;

@RestController
@RequestMapping(path = "/api/v1/branch/")
public class BranchController {

	private BranchService branchService;
	private UserService userService;

	@Autowired
	public BranchController(BranchService branchService, UserService userService) {
		this.branchService = branchService;
		this.userService = userService;
	}

	@GetMapping
	@RequestMapping("/listAll")
	@PreAuthorize("hasAuthority('BRANCH_USER')")
	public ResponseEntity<BranchResponse> getAllBranch() {
		BranchResponse branches = BranchResponse.builder().branch(this.branchService.getAllBranch()).build();
		return ResponseEntity.ok(branches);
	}

	@GetMapping
	@RequestMapping("/get/{id}")
	@PreAuthorize("hasAuthority('BRANCH_USER')")
	public ResponseEntity<BranchResponse> get(@PathVariable("id") String id) {
		BranchResponse branches = BranchResponse.builder().branch(Arrays.asList(this.branchService.get(id))).build();
		return ResponseEntity.ok(branches);
	}

	@PostMapping
	@RequestMapping(consumes = MediaType.APPLICATION_JSON_VALUE, path = "/save", produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('BRANCH_MANAGER')")
	public ResponseEntity<Branch> saveBranch(@RequestBody Branch branch) {
		branch.validateForCreation();
		try {
			Branch createdBranch = this.branchService.saveBranch(branch);
			User user = User.builder().build().createBranchUser(branch);
			this.userService.save(user);
			return ResponseEntity.ok(createdBranch);
		} catch (Exception ex) {
			Log.error("BranchController", "saveBranch", "Branch Creation Failed " + ex, ex);
			throw new RuntimeException("Branch Not Created");
		}
	}

	@PostMapping
	@RequestMapping(consumes = MediaType.APPLICATION_JSON_VALUE, path = "/update", produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('BRANCH_MANAGER')")
	public ResponseEntity<Branch> update(@RequestBody Branch object) {
		object.validateForUpdation();
		try {
			Branch update = this.branchService.update(object);
			User user = User.builder().build().createBranchUser(object);
			this.userService.update(user);
			return ResponseEntity.ok(update);
		} catch (Exception ex) {
			Log.error("BranchController", "saveBranch", "Branch Updation Failed " + ex, ex);
			throw new RuntimeException("Branch Not Updated");
		}
	}

	@GetMapping
	@RequestMapping(path = "/delete/{id}")
	@PreAuthorize("hasAuthority('BRANCH_MANAGER')")
	public ResponseEntity<String> delete(@PathVariable("id") String id) {
		return ResponseEntity.ok(this.branchService.delete(id));

	}

}
