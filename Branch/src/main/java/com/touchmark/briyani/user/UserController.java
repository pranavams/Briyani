package com.touchmark.briyani.user;

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
@RequestMapping(path = "/api/v1/user/")
public class UserController {
	private UserService service;

	@Autowired
	public UserController(UserService service) {
		this.service = service;
	}

	@GetMapping
	@RequestMapping("/listAll")
	public ResponseEntity<UserResponse> getAll() {
		UserResponse users = UserResponse.builder().users(this.service.getAll()).build();
		Log.log("UserController", "getAll", "User To Send " + users);
		return ResponseEntity.ok(users);
	}

	@GetMapping
	@RequestMapping("/get/{id}")
	public ResponseEntity<UserResponse> get(@PathVariable("id") String id) {
		Log.log("UserController", "get", "Parameter Received " + id);
		UserResponse user = UserResponse.builder().users(Arrays.asList(this.service.get(id))).build();
		Log.log("UserController", "get", "User To Send " + user);
		return ResponseEntity.ok(user);
	}

	@GetMapping
	@RequestMapping("/getByUserName/{userName}")
	public ResponseEntity<UserResponse> getByUserName(@PathVariable("userName") String userName) {
		Log.log("UserController", "get", "Parameter Received " + userName);
		UserResponse user = UserResponse.builder().users(Arrays.asList(this.service.findByUsername(userName))).build();
		Log.log("UserController", "get", "User To Send " + user);
		return ResponseEntity.ok(user);
	}

	@GetMapping
	@RequestMapping("/getAllByType/{type}")
	public ResponseEntity<UserResponse> getByType(@PathVariable("type") String type) {
		Log.log("UserController", "get", "Parameter Received " + type);
		UserResponse user = UserResponse.builder().users(this.service.getAllByUserType(type)).build();
		Log.log("UserController", "get", "User To Send " + user);
		return ResponseEntity.ok(user);
	}

	@PostMapping
	@RequestMapping(consumes = MediaType.APPLICATION_JSON_VALUE, path = "/save", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserEntity> save(@RequestBody User user) {
		UserEntity created = this.service.save(user);
		return ResponseEntity.ok(created);
	}
}
