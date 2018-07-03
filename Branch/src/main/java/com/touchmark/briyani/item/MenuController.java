package com.touchmark.briyani.item;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/menu/")
public class MenuController {

	private MenuService service;

	@Autowired
	public MenuController(MenuService service) {
		this.service = service;
	}

	@GetMapping
	@RequestMapping("/listAll")
	//@PreAuthorize("hasAuthority('STANDARD_USER')")
	public ResponseEntity<MenuResponse> getAllBranch() {
		return ResponseEntity.ok(MenuResponse.builder().menu(this.service.getAll()).build());
	}

	@CrossOrigin(origins = "http://localhost:36363")
	@PostMapping
	@RequestMapping(consumes = MediaType.APPLICATION_JSON_VALUE, path = "/save", produces = MediaType.APPLICATION_JSON_VALUE)
	//@PreAuthorize("hasAuthority('STANDARD_USER')")
	public ResponseEntity<MenuEntity> saveBranch(@RequestBody Menu object) {
		MenuEntity created = this.service.save(object);
		return ResponseEntity.ok(created);
	}

}
