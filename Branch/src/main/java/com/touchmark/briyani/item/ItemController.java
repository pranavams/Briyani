package com.touchmark.briyani.item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/items/")
public class ItemController {

	private ItemService service;

	@Autowired
	public ItemController(ItemService service) {
		this.service = service;
	}

	@GetMapping
	@RequestMapping("/listAll")
	//@PreAuthorize("hasAuthority('STANDARD_USER') or hasAuthority('ADMIN_USER')")
	@PreAuthorize("hasAuthority('ROLE_USER')")
	public ResponseEntity<ItemResponse> getAllBranch() {
		return ResponseEntity.ok(ItemResponse.builder().branch(this.service.getAll()).build());
	}

	@PostMapping
	@RequestMapping("/save")
	@PreAuthorize("hasAuthority('ROLE_USER')")
	public ResponseEntity<ItemEntity> saveBranch(@RequestBody Item object) {
		ItemEntity created = this.service.save(object);
		return ResponseEntity.ok(created);
	}

}
