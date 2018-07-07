package com.touchmark.briyani.customer;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.touchmark.briyani.commons.Address;
import com.touchmark.briyani.staff.Staff;
import com.touchmark.briyani.staff.StaffEntity;

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
	private String telephoneNumber;
	private String email;
	private OffsetDateTime dateOfBirth;
	private Address address;

	public CustomerEntity createEntity() {
		return CustomerEntity.builder().address(address.createEntity()).dateOfBirth(dateOfBirth).firstName(firstName)
				.email(email).telephoneNumber(telephoneNumber).lastName(lastName).middleName(middleName)
				.lastUpdatedDate(OffsetDateTime.now()).mobileNumber(mobileNumber).salutation(salutation).build();
	}

	public List<Customer> transformEntities(List<CustomerEntity> customers) {
		ArrayList<Customer> responseCustomers = new ArrayList<Customer>();
		for (CustomerEntity customerEntity : customers) {
			responseCustomers.add(transformEntities(customerEntity));
		}
		return responseCustomers;
	}

	private String transformId(long id) {
		return "CUST" + id;
	}

	public Long getDatabaseID() {
		return Long.parseLong(id.substring(4));
	}

	public Customer transformEntities(CustomerEntity customerEntity) {
		return Customer.builder().id(transformId(customerEntity.getId())).email(customerEntity.getEmail())
				.telephoneNumber(customerEntity.getTelephoneNumber())
				.address(Address.builder().build().transform(customerEntity.getAddress()))
				.dateOfBirth(customerEntity.getDateOfBirth()).firstName(customerEntity.getFirstName())
				.lastName(customerEntity.getLastName()).middleName(customerEntity.getMiddleName())
				.mobileNumber(customerEntity.getMobileNumber()).salutation(customerEntity.getSalutation()).build();
	}
}
