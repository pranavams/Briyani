package com.touchmark.briyani.image;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.touchmark.briyani.item.ImageEntity;
import com.touchmark.briyani.item.ImageRepository;
import com.touchmark.briyani.item.Item;
import com.touchmark.briyani.item.ItemRepository;

@Service
public class ImageService {
	private ImageRepository imageRepository;
	private ItemRepository itemRepository;

	@Autowired
	public ImageService(ImageRepository imageRepository, ItemRepository itemRepository) {
		this.imageRepository = imageRepository;
		this.itemRepository = itemRepository;
	}

	public boolean saveImage(String id, String type, MultipartFile uploadfile) {
		validateIdAndType(id, type);
		validateFile(uploadfile);
		saveFile(id, type, uploadfile);
		return true;
	}

	private void saveFile(String id, String type, MultipartFile file) {
		switch (type.toLowerCase()) {
		case "item":
			saveImage(Item.builder().id(id).build().DBID(), type, file);
			break;
		default:
			throw new RuntimeException("Invalid Image Type");
		}

	}

	public void validateIdAndType(String id, String type) {
		switch (type.toLowerCase()) {
		case "item":
			validateItemId(id);
			break;
		}
	}

	public void validateItemId(String id) {
		boolean isItemAvailable = this.itemRepository.findById(Item.builder().id(id).build().DBID())
				.isPresent();
		if (!isItemAvailable)
			throw new RuntimeException("Item Not Available");
	}

	public void validateFile(MultipartFile uploadfiles) {
		if (StringUtils.isEmpty(uploadfiles.getOriginalFilename())) {
			throw new RuntimeException("No Image Selected");
		}

		if (uploadfiles.isEmpty()) {
			throw new RuntimeException("Invalid Image Content");
		}
	}

	private void saveImage(Long id, String type, MultipartFile file) {
		try {
			this.imageRepository.save(ImageEntity.builder().typeId(id).image(file.getBytes()).type(type.toLowerCase())
					.size(file.getSize()).fileName(file.getOriginalFilename()).build());
		} catch (IOException e) {
			throw new RuntimeException("Unable to process the image");
		}
	}

	public ImageEntity getImage(String id, String type) {
		switch (type.toLowerCase()) {
		case "item":
			return getImage(Item.builder().id(id).build().DBID(), type);
		default:
			throw new RuntimeException("Invalid Image Type");
		}
	}

	public ImageEntity getImage(Long id, String type) {
		List<ImageEntity> images = this.imageRepository.findByTypeAndTypeId(type, id);
		if (images == null || images.isEmpty())
			throw new RuntimeException("Image Not Found");
		return images.get(0);
	}
}
