package com.touchmark.briyani.rider;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

import com.touchmark.briyani.commons.Address;
import com.touchmark.briyani.commons.AddressEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Rider {

	private String id;
	private String departmentType;
	private Address address;

	private String riderPersonSalutation;
	private String riderPersonFirstName;
	private String riderPersonMiddleName;
	private String riderPersonLastName;

	private String mobileNumber;
	private String riderPersonNumber;
	
	private OffsetDateTime dateOfBirth;

	private String email;

	private String gender;

	private String zone;

	private String riderIdCardNo;

	public RiderEntity createEntity() {
		AddressEntity addressEntity = AddressEntity.builder().area(address.getArea()).city(address.getCity())
				.country(address.getCountry()).doorNumber(address.getDoorNumber()).state(address.getState())
				.street(address.getStreet()).zipcode(address.getZipcode()).build();
		return RiderEntity.builder().riderPersonFirstName(riderPersonFirstName)
				.dateOfBirth(dateOfBirth)
				.riderPersonLastName(riderPersonLastName).riderPersonMiddleName(riderPersonMiddleName)
				.riderPersonNumber(riderPersonNumber).riderPersonSalutation(riderPersonSalutation).email(email)
				.mobileNumber(mobileNumber).address(addressEntity).build();
	}

	public Rider transformEntity(RiderEntity entity) {
		return Rider.builder().id(transformId(entity.getId(), entity.getDepartmentType())).email(entity.getEmail())
				.dateOfBirth(entity.getDateOfBirth())
				.riderPersonSalutation(entity.getRiderPersonSalutation())
				.riderPersonFirstName(entity.getRiderPersonFirstName())
				.riderPersonLastName(entity.getRiderPersonLastName())
				.riderPersonMiddleName(entity.getRiderPersonMiddleName())
				.riderPersonNumber(entity.getRiderPersonNumber()).departmentType(entity.getDepartmentType())
				.gender(entity.getGender()).mobileNumber(entity.getMobileNumber())
				.riderIdCardNo(entity.getRiderIdCardNo()).zone(entity.getZone())
				.address(Address.builder().area(entity.getAddress().getArea()).city(entity.getAddress().getCity())
						.country(entity.getAddress().getCountry()).doorNumber(entity.getAddress().getDoorNumber())
						.state(entity.getAddress().getState()).street(entity.getAddress().getStreet())
						.zipcode(entity.getAddress().getZipcode()).build())
				.build();
	}

	private String transformId(long id, String departmentType) {
		if ("Branch".equalsIgnoreCase(departmentType))
			return "BRRI" + id;
		else
			return "ENDRI" + id;
	}

	public List<Rider> transformEntities(List<RiderEntity> entities) {
		List<Rider> riders = new ArrayList<>(entities.size());
		for (RiderEntity rdierEntity : entities) {
			riders.add(transformEntity(rdierEntity));
		}
		return riders;
	}
}
