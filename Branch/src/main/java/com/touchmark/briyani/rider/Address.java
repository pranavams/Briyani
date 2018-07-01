package com.touchmark.briyani.rider;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Address {
	private String doorNumber;
	private String street;
	private String area;
	private String city;
	private String state;
	private String country;
	private String zipcode;

}
