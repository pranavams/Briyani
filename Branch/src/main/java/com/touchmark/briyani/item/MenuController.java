package com.touchmark.briyani.item;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.touchmark.briyani.commons.Log;

@RestController
@RequestMapping(path = "/api/v1/menu/")
// @PreAuthorize("hasAuthority('STANDARD_USER')")
public class MenuController {

	private MenuService service;

	@Autowired
	public MenuController(MenuService service) {
		this.service = service;
	}

	@GetMapping
	@RequestMapping("/listAll")
	public ResponseEntity<MenuResponse> getAllBranch() {
		return ResponseEntity.ok(MenuResponse.builder().menu(this.service.getAll()).build());
	}

	@PostMapping
	@RequestMapping(consumes = MediaType.APPLICATION_JSON_VALUE, path = "/save", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<MenuEntity> saveBranch(@RequestBody Menu object) {
		MenuEntity created = this.service.save(object);
		return ResponseEntity.ok(created);
	}

	@GetMapping
	@RequestMapping("/listRecent")
	public ResponseEntity<MenuResponse> getRecent() {
		return ResponseEntity.ok(MenuResponse.builder().menu(this.service.getRecent()).build());
	}
}
