package com.touchmark.briyani.branch;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Branch {

	private String name;
	private String email;
	private String latitude;
	private String longitude;
	private String notes;
	private Address address;
	private String contactPersonFirstName;
	private String contactPersonLastName;
	private String contactPersonMiddleName;
	private String contactPersonSalutation;
	private String mobileNumber;
	private String telephone;
	private String contactPersonNumber;

	public BranchEntity createEntity() {
		AddressEntity addressEntity = AddressEntity.builder().area(address.getArea()).city(address.getCity())
				.country(address.getCountry()).doorNumber(address.getDoorNumber()).state(address.getState())
				.street(address.getStreet()).zipcode(address.getZipcode()).build();
		return BranchEntity.builder().contactPersonFirstName(contactPersonFirstName)
				.contactPersonLastName(contactPersonLastName).contactPersonMiddleName(contactPersonMiddleName)
				.contactPersonNumber(contactPersonNumber).contactPersonSalutation(contactPersonSalutation).email(email)
				.latitude(latitude).longitude(longitude).mobileNumber(mobileNumber).name(name).notes(notes)
				.telephone(telephone).address(addressEntity).build();
	}
	
	public Branch transformEntity(BranchEntity entity) {
		this.name = entity.getName();
		this.email = entity.getEmail();
		this.latitude = entity.getLatitude();
		this.longitude = entity.getLongitude();
		this.notes = entity.getNotes();
		this.contactPersonFirstName = entity.getContactPersonFirstName();
		this.contactPersonLastName = entity.getContactPersonLastName();
		this.contactPersonMiddleName = entity.getContactPersonMiddleName();
		this.contactPersonNumber = entity.getContactPersonNumber();
		this.contactPersonSalutation = entity.getContactPersonSalutation();
		this.mobileNumber= entity.getMobileNumber();
		this.telephone = entity.getTelephone();
		this.address = Address.builder().area(entity.getAddress().getArea())
				.city(entity.getAddress().getCity())
				.country(entity.getAddress().getCountry())
				.doorNumber(entity.getAddress().getDoorNumber())
				.state(entity.getAddress().getState())
				.street(entity.getAddress().getStreet())
				.zipcode(entity.getAddress().getZipcode())
				.build();
		return this;
	}

	public List<Branch> transformEntities(List<BranchEntity> entities) {
		List<Branch> branches = new ArrayList<>(entities.size());
		for (BranchEntity branchEntity : entities) {
			branches.add(transformEntity(branchEntity));
		}
		return branches;
	}
}
