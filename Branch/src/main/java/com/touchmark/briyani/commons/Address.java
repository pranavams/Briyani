package com.touchmark.briyani.commons;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Address {
	private String doorNumber;
	private String street;
	private String area;
	private String city;
	private String state;
	private String country;
	private String zipcode;

	public Address transform(AddressEntity entity) {
		if (entity == null)
			return Address.builder().build();
		try {
			return Address.builder().area(entity.getArea()).city(entity.getCity()).country(entity.getCountry())
					.doorNumber(entity.getDoorNumber()).state(entity.getState()).street(entity.getStreet())
					.zipcode(entity.getZipcode()).build();
		} catch (Exception ex) {
			Log.log("Address", "Transform", "Exception " + ex, ex);
			return Address.builder().build();
		}
	}

	public AddressEntity createEntity() {
		return AddressEntity.builder().area(area).city(city).country(country).doorNumber(doorNumber).state(state)
				.lastUpdatedDate(OffsetDateTime.now()).street(street).zipcode(zipcode).build();
	}

	public String getDoorNumber() {
		return doorNumber == null ? "" : doorNumber;
	}

	public String getStreet() {
		return street == null ? "" : street;
	}

	public String getArea() {
		return area == null ? "" : area;
	}

	public String getCity() {
		return city == null ? "" : city;
	}

	public String getState() {
		return state == null ? "" : state;
	}

	public String getCountry() {
		return country == null ? "" : country;
	}

	public String getZipcode() {
		return zipcode == null ? "" : zipcode;
	}

	public List<Address> transformEntities(List<AddressEntity> findAll) {
		List<Address> address = new ArrayList<>();
		for (AddressEntity addressEntity : findAll) {
			address.add(transform(addressEntity));
		}
		return address;
	}

}
