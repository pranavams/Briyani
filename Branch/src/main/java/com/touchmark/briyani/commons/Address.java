package com.touchmark.briyani.commons;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
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
		return Address.builder().area(entity.getArea()).city(entity.getCity()).country(entity.getCountry())
				.doorNumber(entity.getDoorNumber()).state(entity.getState()).street(entity.getStreet())
				.zipcode(entity.getZipcode()).build();
	}

	public AddressEntity createEntity() {
		return AddressEntity.builder().area(area).city(city).country(country).doorNumber(doorNumber).state(state)
				.street(street).zipcode(zipcode).build();
	}

}
