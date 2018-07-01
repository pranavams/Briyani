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
	
}
