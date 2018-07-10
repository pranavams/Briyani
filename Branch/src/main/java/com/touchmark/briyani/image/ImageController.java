package com.touchmark.briyani.image;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.touchmark.briyani.commons.Log;
import com.touchmark.briyani.item.ImageEntity;

@RestController
@RequestMapping(path = "/api/v1/image")
public class ImageController {
	private ImageService service;

	@Autowired
	public ImageController(ImageService service) {
		this.service = service;
	}

	@PostMapping
	@RequestMapping(path =  "/imageUpload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> upload(@RequestParam("entityType") String type, @RequestParam("entityId") String id,
			@RequestParam("entityImage") MultipartFile uploadfile) {
		try {
			Log.log("ImageController", "Upload", "Parameters " + id + " - " + type);
			this.service.saveImage(id, type.trim(), uploadfile);
			return ResponseEntity.ok().body("Image Saved");
		} catch (Exception e) {
			Log.error("ImageController", "upload", "Exception " + e, e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}

	@RequestMapping("/imageDownload/{id}/{type}")
	public ResponseEntity<byte[]> downloadFile(@PathVariable String id, @PathVariable String type) throws IOException {
		try {
			Log.log("ImageController", "Upload", "Parameters " + id + " - " + type);
			ImageEntity image = this.service.getImage(id, type);
			return ResponseEntity.ok()
					.contentType(MediaType.IMAGE_JPEG)
					.contentLength(image.getSize()).body(image.getImage());
		} catch (Exception e) {
			Log.error("ImageController", "download", "Exception " + e, e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).contentType(MediaType.TEXT_PLAIN)
					.body("Image Not Downloaded".getBytes());
		}
	}

}
