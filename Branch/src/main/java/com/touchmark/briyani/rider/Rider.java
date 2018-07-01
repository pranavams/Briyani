package com.touchmark.briyani.rider;

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
public class Rider {
	
	private String departmentType;
	private Address address;
	private String riderPersonFirstName;
	
	private String riderPersonLastName;
	
	private String riderPersonMiddleName;
	private String riderPersonSalutation;
	
	private String mobileNumber;
	private String riderPersonNumber;

	private String name;

	private String email;
	
	private String gender;
	
	private String zone;
	
	private String riderIdCardNo;
	
	private String photo;

	public RiderEntity createEntity() {
		AddressEntity addressEntity = AddressEntity.builder().area(address.getArea()).city(address.getCity())
				.country(address.getCountry()).doorNumber(address.getDoorNumber()).state(address.getState())
				.street(address.getStreet()).zipcode(address.getZipcode()).build();
		return RiderEntity.builder().riderPersonFirstName(riderPersonFirstName)
				.riderPersonLastName(riderPersonLastName).riderPersonMiddleName(riderPersonMiddleName)
				.riderPersonNumber(riderPersonNumber).riderPersonSalutation(riderPersonSalutation).email(email)
				.mobileNumber(mobileNumber).name(name).address(addressEntity).build();
	}
	
	public Rider transformEntity(RiderEntity entity) {
		this.name = entity.getName();
		this.email = entity.getEmail();
		this.riderPersonFirstName = entity.getRiderPersonFirstName();
		this.riderPersonLastName = entity.getRiderPersonLastName();
		this.riderPersonMiddleName = entity.getRiderPersonMiddleName();
		this.riderPersonNumber = entity.getRiderPersonNumber();
		this.departmentType = entity.getDepartmentType();
		this.gender = entity.getGender();
		this.mobileNumber= entity.getMobileNumber();
		this.riderIdCardNo = entity.getRiderIdCardNo();
		this.zone = entity.getZone();
		this.photo =entity.getPhoto();
		
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

	public List<Rider> transformEntities(List<RiderEntity> entities) {
		List<Rider> riders = new ArrayList<>(entities.size());
		for (RiderEntity rdierEntity : entities) {
			riders.add(transformEntity(rdierEntity));
		}
		return riders;
	}
}
