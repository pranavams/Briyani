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
@PreAuthorize("hasAuthority('BRANCH_USER')")
public class ItemController {

	private ItemService service;

	@Autowired
	public ItemController(ItemService service) {
		this.service = service;
	}

	@GetMapping
	@RequestMapping("/listAll")
	public ResponseEntity<ItemResponse> getAll() {
		return ResponseEntity.ok(ItemResponse.builder().items(this.service.getAll()).build());
	}

	@GetMapping
	@RequestMapping("/listAllWithImages")
	public ResponseEntity<ItemResponse> getAllWithImages() {
		return ResponseEntity.ok(ItemResponse.builder().items(this.service.getAllWithImages()).build());
	}

	@PostMapping
	@RequestMapping("/save")
	@PreAuthorize("hasAuthority('BRANCH_MANAGER')")
	public ResponseEntity<ItemEntity> save(@RequestBody Item object) {
		ItemEntity created = this.service.save(object);
		return ResponseEntity.ok(created);
	}

	@GetMapping
	@RequestMapping("/listRecent")
	public ResponseEntity<ItemResponse> getRecent() {
		return ResponseEntity.ok(ItemResponse.builder().items(this.service.getRecent()).build());
	}

}
