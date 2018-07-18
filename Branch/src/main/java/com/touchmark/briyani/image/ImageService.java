package com.touchmark.briyani.image;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.touchmark.briyani.branch.Branch;
import com.touchmark.briyani.branch.BranchRepository;
import com.touchmark.briyani.commons.Log;
import com.touchmark.briyani.customer.Customer;
import com.touchmark.briyani.customer.CustomerRepository;
import com.touchmark.briyani.item.ImageEntity;
import com.touchmark.briyani.item.ImageRepository;
import com.touchmark.briyani.item.Item;
import com.touchmark.briyani.item.ItemRepository;
import com.touchmark.briyani.rider.Rider;
import com.touchmark.briyani.rider.RiderRepository;
import com.touchmark.briyani.staff.Staff;
import com.touchmark.briyani.staff.StaffRepository;

@Service
public class ImageService {
	private ImageRepository imageRepository;
	private ItemRepository itemRepository;
	private CustomerRepository customerRepository;
	private RiderRepository riderRepository;
	private StaffRepository staffRepository;
	private BranchRepository branchRepository;

	@Autowired
	public ImageService(ImageRepository imageRepository, ItemRepository itemRepository,
			CustomerRepository customerRepository, StaffRepository staffRepository, RiderRepository riderRepository,
			BranchRepository branchRepository) {
		this.imageRepository = imageRepository;
		this.itemRepository = itemRepository;
		this.customerRepository = customerRepository;
		this.staffRepository = staffRepository;
		this.riderRepository = riderRepository;
		this.branchRepository = branchRepository;
	}

	public boolean saveImage(String id, String type, MultipartFile uploadfile) {
		validateIdAndType(id, type);
		validateImage(uploadfile);
		saveFile(id, type, uploadfile);
		return true;
	}

	public ImageEntity getImage(String id, String type) {
		return getImageFromRepository(id, type);
	}

	private void validateImage(MultipartFile uploadImage) {
		if (StringUtils.isEmpty(uploadImage.getOriginalFilename())) {
			throw new RuntimeException("No Image Selected");
		}

		if (uploadImage.isEmpty()) {
			throw new RuntimeException("Invalid Image Content");
		}
	}

	private void saveImage(Long id, String type, MultipartFile file) {
		try {
			this.imageRepository.saveAndFlush(getOrCreateImage(id, type, file));
		} catch (IOException e) {
			throw new RuntimeException("Unable to process the image");
		}
	}

	private ImageEntity getOrCreateImage(Long id, String type, MultipartFile file) throws IOException {
		List<ImageEntity> images = getImageFromRepository(id, type);

		if (images.isEmpty())
			return createImageEntity(id, type, file);
		else
			return images.get(0);
	}

	private ImageEntity createImageEntity(Long id, String type, MultipartFile file) throws IOException {
		return ImageEntity.builder().typeId(id).image(file.getBytes()).type(type.toLowerCase())
				.size(file.getSize()).fileName(file.getOriginalFilename()).build();
	}

	private List<ImageEntity> getImageFromRepository(Long id, String type) {
		try {
			return this.imageRepository.findByTypeAndTypeId(type, id);
		} catch (Exception ex) {
			Log.error("ImageService", "getOrCreateImage", "Image Not Found Need to create", ex);
			return Collections.emptyList();
		}
	}

	private ImageEntity getImage(Long id, String type) {
		List<ImageEntity> images = this.imageRepository.findByTypeAndTypeId(type, id);
		if (images == null || images.isEmpty())
			throw new RuntimeException("Image Not Found");
		return images.get(0);
	}

	private ImageEntity getImageFromRepository(String id, String type) {
		switch (type.toLowerCase()) {
		case "item":
			return getImage(Item.builder().id(id).build().DBID(), type);
		case "customer":
			return getImage(Customer.builder().id(id).build().DBID(), type);
		case "staff":
			return getImage(Staff.builder().id(id).build().DBID(), type);
		case "rider":
			return getImage(Rider.builder().id(id).build().DBID(), type);
		case "branch":
			return getImage(Branch.builder().id(id).build().DBID(), type);
		default:
			throw new RuntimeException("Invalid Image Type");
		}
	}

	private void saveFile(String id, String type, MultipartFile file) {
		switch (type.toLowerCase()) {
		case "item":
			saveImage(Item.builder().id(id).build().DBID(), type, file);
			break;
		case "customer":
			saveImage(Customer.builder().id(id).build().DBID(), type, file);
			break;
		case "staff":
			saveImage(Staff.builder().id(id).build().DBID(), type, file);
			break;
		case "rider":
			saveImage(Rider.builder().id(id).build().DBID(), type, file);
			break;
		case "branch":
			saveImage(Branch.builder().id(id).build().DBID(), type, file);
			break;
		}

	}

	private void validateIdAndType(String id, String type) {
		switch (type.toLowerCase()) {
		case "item":
			validateItemId(id);
			break;
		case "customer":
			validateCustomerId(id);
			break;
		case "staff":
			validateStaffId(id);
			break;
		case "rider":
			validateRiderId(id);
			break;
		case "branch":
			validateBranchId(id);
			break;
		default:
			throw new RuntimeException("Invalid Image Type");
		}
	}

	private void validateBranchId(String id) {
		if (!this.branchRepository.findById(Branch.builder().id(id).build().DBID()).isPresent())
			throw new RuntimeException("Branch Not Available");
	}

	private void validateRiderId(String id) {
		if (!this.riderRepository.findById(Rider.builder().id(id).build().DBID()).isPresent())
			throw new RuntimeException("Rider Not Available");
	}

	private void validateStaffId(String id) {
		if (!this.staffRepository.findById(Staff.builder().id(id).build().DBID()).isPresent())
			throw new RuntimeException("Staff Not Available");
	}

	private void validateCustomerId(String id) {
		if (!this.customerRepository.findById(Customer.builder().id(id).build().DBID()).isPresent())
			throw new RuntimeException("Customer Not Available");
	}

	private void validateItemId(String id) {
		if (!this.itemRepository.findById(Item.builder().id(id).build().DBID()).isPresent())
			throw new RuntimeException("Item Not Available");
	}

}
