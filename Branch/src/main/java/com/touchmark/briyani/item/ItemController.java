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
@RequestMapping(path = "/api/v1/item/")
public class ItemController {

	private ItemService service;

	@Autowired
	public ItemController(ItemService service) {
		this.service = service;
	}

	@GetMapping
	@RequestMapping("/listAll")
	@PreAuthorize("hasAuthority('STANDARD_USER')")
	public ResponseEntity<ItemResponse> getAllBranch() {
		return ResponseEntity.ok(ItemResponse.builder().branch(this.service.getAll()).build());
	}

	@PostMapping
	@RequestMapping("/save")
	@PreAuthorize("hasAuthority('STANDARD_USER')")
	public ResponseEntity<ItemEntity> saveBranch(@RequestBody Item object) {
		ItemEntity created = this.service.save(object);
		return ResponseEntity.ok(created);
	}

}
