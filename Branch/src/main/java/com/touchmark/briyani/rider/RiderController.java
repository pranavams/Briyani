package com.touchmark.briyani.rider;

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
@RequestMapping(path = "/api/v1/rider/")
@PreAuthorize("hasAuthority('BRANCH_USER')")
public class RiderController {

	private RiderService service;
	private UserService userService;

	@Autowired
	public RiderController(RiderService service, UserService userService) {
		this.service = service;
		this.userService = userService;
	}

	@GetMapping
	@RequestMapping("/listAll")
	@PreAuthorize("hasAuthority('BRANCH_USER')")
	public ResponseEntity<RiderResponse> getAll() {
		return ResponseEntity.ok(RiderResponse.builder().rider(this.service.getAll()).build());
	}

	@PostMapping
	@RequestMapping("/save")
	@PreAuthorize("hasAuthority('BRANCH_MANAGER')")
	public ResponseEntity<Rider> save(@RequestBody Rider rider) {
		rider.validateForCreation();
		try {
			Rider createdRider = this.service.save(rider);
			createdRider.setPassword(rider.getPassword());
			User user = User.builder().build().createRiderUser(createdRider);
			this.userService.save(user);
			return ResponseEntity.ok(createdRider);
		} catch (Exception ex) {
			Log.error("RiderController", "save", "Rider Creation Failed " + ex, ex);
			throw new RuntimeException("Rider Not Created");
		}
	}

	@GetMapping
	@RequestMapping(path = "/delete/{id}")
	@PreAuthorize("hasAuthority('BRANCH_MANAGER')")
	public ResponseEntity<String> delete(@PathVariable("id") String id) {
		return ResponseEntity.ok(this.service.delete(id));

	}

	@GetMapping
	@RequestMapping("/listRecent")
	@PreAuthorize("hasAuthority('BRANCH_USER')")
	public ResponseEntity<RiderResponse> getRecent() {
		return ResponseEntity.ok(RiderResponse.builder().rider(this.service.getRecent()).build());
	}

	@GetMapping
	@RequestMapping("/get/{id}")
	@PreAuthorize("hasAuthority('BRANCH_USER')")
	public ResponseEntity<RiderResponse> get(@PathVariable("id") String id) {
		return ResponseEntity.ok(RiderResponse.builder().rider(Arrays.asList(this.service.get(id))).build());
	}

	@PostMapping
	@RequestMapping(consumes = MediaType.APPLICATION_JSON_VALUE, path = "/update", produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('BRANCH_MANAGER')")
	public ResponseEntity<Rider> update(@RequestBody Rider object) {
		object.validateForUpdation();
		Rider update = this.service.update(object);
		return ResponseEntity.ok(update);
	}
}
