package com.touchmark.briyani.item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/item/")
// @PreAuthorize("hasAuthority('STANDARD_USER')")
public class ItemController {

	private ItemService service;

	@Autowired
	public ItemController(ItemService service) {
		this.service = service;
	}

	@GetMapping
	@RequestMapping("/listAll")
	public ResponseEntity<ItemResponse> getAllBranch() {
		return ResponseEntity.ok(ItemResponse.builder().items(this.service.getAll()).build());
	}

	@PostMapping
	@RequestMapping("/save")
	public ResponseEntity<ItemEntity> saveBranch(@RequestBody Item object) {
		ItemEntity created = this.service.save(object);
		return ResponseEntity.ok(created);
	}

	@GetMapping
	@RequestMapping("/listRecent")
	public ResponseEntity<ItemResponse> getRecent() {
		return ResponseEntity.ok(ItemResponse.builder().items(this.service.getRecent()).build());
	}

}
