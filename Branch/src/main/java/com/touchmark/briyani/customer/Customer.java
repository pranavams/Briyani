package com.touchmark.briyani.customer;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

import com.touchmark.briyani.commons.Address;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Customer {

	private String id;
	private String firstName;
	private String lastName;
	private String middleName;
	private String salutation;
	private String mobileNumber;
	private String email;
	private OffsetDateTime dateOfBirth;
	private Address address;

	public CustomerEntity createEntity() {
		return CustomerEntity.builder().address(address.createEntity()).dateOfBirth(dateOfBirth).firstName(firstName)
				.lastName(lastName).middleName(middleName).mobileNumber(mobileNumber).salutation(salutation).build();
	}

	public List<Customer> transformEntities(List<CustomerEntity> customers) {
		ArrayList<Customer> responseCustomers = new ArrayList<Customer>();
		for (CustomerEntity customerEntity : customers) {
			responseCustomers.add(Customer.builder().id(transformId(customerEntity.getId()))
					.email(customerEntity.getEmail())
					.address(Address.builder().build().transform(customerEntity.getAddress()))
					.dateOfBirth(customerEntity.getDateOfBirth()).firstName(customerEntity.getFirstName())
					.lastName(customerEntity.getLastName()).middleName(customerEntity.getMiddleName())
					.mobileNumber(customerEntity.getMobileNumber()).salutation(customerEntity.getSalutation()).build());
		}
		return responseCustomers;
	}

	private String transformId(long id) {
		return "CUST" + id;
	}
}
