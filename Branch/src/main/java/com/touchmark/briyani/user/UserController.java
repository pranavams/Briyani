package com.touchmark.briyani.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/user/")
@CrossOrigin(origins = {"https://briyani-web-ui.cfapps.io/", "http://localhost:36363", "http://localhost", "http://localhost/touch/kitchen", "http://localhost/touch"})
// @PreAuthorize("hasAuthority('STANDARD_USER')")
public class UserController {

	private UserService service;

	@Autowired
	public UserController(UserService service) {
		this.service = service;
	}

	@PostMapping
	@RequestMapping(consumes = MediaType.APPLICATION_JSON_VALUE, path = "/save", produces = MediaType.APPLICATION_JSON_VALUE)
	@CrossOrigin(origins = {"https://briyani-web-ui.cfapps.io/", "http://localhost:36363", "http://localhost", "http://localhost/touch/kitchen", "http://localhost/touch"})
	public ResponseEntity<UserEntity> save(@RequestBody User user) {
		UserEntity created = this.service.save(user);
		return ResponseEntity.ok(created);
	}
}
