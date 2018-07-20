package com.touchmark.briyani.user;

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

import com.touchmark.briyani.branch.BranchService;
import com.touchmark.briyani.commons.Log;
import com.touchmark.briyani.commons.ValueObject;
import com.touchmark.briyani.rider.RiderService;

@RestController
@RequestMapping(path = "/api/v1/user/")
public class UserController {
	private UserService service;
	private BranchService branchService;
	private RiderService riderService;

	@Autowired
	public UserController(UserService service, BranchService branchService, RiderService riderService) {
		this.service = service;
		this.branchService = branchService;
		this.riderService = riderService;
	}

	@GetMapping
	@RequestMapping("/listAll")
	@PreAuthorize("hasAuthority('BRANCH_USER')")
	public ResponseEntity<UserResponse> getAll() {
		UserResponse users = UserResponse.builder().users(this.service.getAll()).build();
		Log.log("UserController", "getAll", "User To Send " + users);
		return ResponseEntity.ok(users);
	}

	@GetMapping
	@RequestMapping("/get/{id}")
	@PreAuthorize("hasAuthority('BRANCH_USER')")
	public ResponseEntity<UserResponse> get(@PathVariable("id") String id) {
		Log.log("UserController", "get", "Parameter Received " + id);
		UserResponse user = UserResponse.builder().users(Arrays.asList(this.service.get(id))).build();
		Log.log("UserController", "get", "User To Send " + user);
		return ResponseEntity.ok(user);
	}

	@GetMapping
	@RequestMapping("/getByUserName/{userName}")
	@PreAuthorize("hasAuthority('BRANCH_USER')")
	public ResponseEntity<UserResponse> getByUserName(@PathVariable("userName") String userName) {
		Log.log("UserController", "get", "Parameter Received " + userName);
		UserResponse user = UserResponse.builder().users(Arrays.asList(this.service.findByUsername(userName))).build();
		Log.log("UserController", "get", "User To Send " + user);
		return ResponseEntity.ok(user);
	}

	@PostMapping
	@RequestMapping("/authenticate/")
	public ResponseEntity<User> authenticate(@RequestBody User user) {
		User validUser = this.service.authenticate(user);
		validUser.setValueObject(getUserTypeObject(validUser.getUserType(), validUser.getUserTypeId()));
		return ResponseEntity.ok(validUser);
	}

	private ValueObject getUserTypeObject(String userType, String userTypeId) {
		switch (userType.toLowerCase()) {
		case "branch":
			return this.branchService.get(userTypeId);
		case "rider":
			return this.riderService.get(userTypeId);
		}
		throw new RuntimeException("Invalid User Type");
	}

	@GetMapping
	@RequestMapping("/getAllByType/{type}")
	@PreAuthorize("hasAuthority('BRANCH_USER')")
	public ResponseEntity<UserResponse> getByType(@PathVariable("type") String type) {
		Log.log("UserController", "get", "Parameter Received " + type);
		UserResponse user = UserResponse.builder().users(this.service.getAllByUserType(type)).build();
		Log.log("UserController", "get", "User To Send " + user);
		return ResponseEntity.ok(user);
	}

	@PostMapping
	@RequestMapping(consumes = MediaType.APPLICATION_JSON_VALUE, path = "/save", produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('BRANCH_ADMIN')")
	public ResponseEntity<UserEntity> save(@RequestBody User user) {
		UserEntity created = this.service.save(user);
		return ResponseEntity.ok(created);
	}
}
