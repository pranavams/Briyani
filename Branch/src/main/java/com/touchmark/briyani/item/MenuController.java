package com.touchmark.briyani.item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.touchmark.briyani.commons.Log;

@RestController
@RequestMapping(path = "/api/v1/menu/")
@PreAuthorize("hasAuthority('BRANCH_USER')")
public class MenuController {

	private MenuService service;

	@Autowired
	public MenuController(MenuService service) {
		this.service = service;
	}

	@GetMapping
	@RequestMapping("/listAll")
	@PreAuthorize("hasAuthority('BRANCH_USER')")
	public ResponseEntity<MenuResponse> getAll() {
		return ResponseEntity.ok(MenuResponse.builder().menu(this.service.getAll()).build());
	}

	@PostMapping
	@RequestMapping(consumes = MediaType.APPLICATION_JSON_VALUE, path = "/save", produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('BRANCH_MANAGER')")
	public ResponseEntity<MenuEntity> saveMenu(@RequestBody Menu object) {
		Log.log("MenuController", "Save", "Object " + object);
		object.validateForCreation();		
		MenuEntity created = this.service.save(object);
		return ResponseEntity.ok(created);
	}

	@GetMapping
	@RequestMapping("/listRecent")
	@PreAuthorize("hasAuthority('BRANCH_USER')")
	public ResponseEntity<MenuResponse> getRecent() {
		return ResponseEntity.ok(MenuResponse.builder().menu(this.service.getRecent()).build());
	}
}
