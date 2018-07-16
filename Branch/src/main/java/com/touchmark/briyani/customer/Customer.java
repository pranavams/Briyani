package com.touchmark.briyani.customer;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

import com.touchmark.briyani.commons.Address;
import com.touchmark.briyani.commons.Log;
import com.touchmark.briyani.commons.Validator;

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
	private String gender;
	private String email;
	private OffsetDateTime dateOfBirth;
	private Address address;

	public CustomerEntity createEntity() {
		return CustomerEntity.builder().address(address.createEntity()).dateOfBirth(dateOfBirth).firstName(firstName)
				.email(email).telephoneNumber(telephoneNumber).lastName(lastName).middleName(middleName).gender(gender)
				.lastUpdatedDate(OffsetDateTime.now()).mobileNumber(mobileNumber).salutation(salutation).build();
	}

	public List<Customer> transformEntities(List<CustomerEntity> customers) {
		ArrayList<Customer> responseCustomers = new ArrayList<Customer>();
		for (CustomerEntity customerEntity : customers) {
			responseCustomers.add(transformEntities(customerEntity));
		}
		return responseCustomers;
	}

	String transformId(long id) {
		return "CUST" + id;
	}
	
	void validateForUpdation() {
		validateForCreation();
		validateForID();
	}

	void validateForDeletion() {
		validateForID();
	}

	void validateForCreation() {
		List<String> errors = new ArrayList<>();

		if (Validator.isStringWithOutValue(this.firstName))
			errors.add("Invalid First Name");

		if (Validator.isStringWithOutValue(this.lastName))
			errors.add("Invalid Last Name");

		if (Validator.isInValidMobileNumber(this.mobileNumber))
			errors.add("Invalid MobileNumber");
		
		if (Validator.isInValidGender(this.gender))
			errors.add("Invalid Gender");

		if (Validator.isInValidDateOfBirth(this.dateOfBirth))
			errors.add("Invalid Date Of Birth");


		Validator.throwExceptionWhenNotEmpty(errors);
	}

	private void validateForID() {
		List<String> errors = new ArrayList<>();
		if (Validator.isStringWithOutValue(this.id))
			errors.add("Invalid Branch ID");

		Validator.throwExceptionWhenNotEmpty(errors);
	}


	public Long DBID() {
		return Long.parseLong(id.substring(4));
	}
	
	public Customer transformEntities(CustomerEntity customer) {
		if (customer == null)
			return Customer.builder().build();
		try {
			return Customer.builder().id(transformId(customer.getId())).email(customer.getEmail())
					.telephoneNumber(customer.getTelephoneNumber()).gender(customer.getGender())
					.address(Address.builder().build().transform(customer.getAddress()))
					.dateOfBirth(customer.getDateOfBirth()).firstName(customer.getFirstName())
					.lastName(customer.getLastName()).middleName(customer.getMiddleName())
					.mobileNumber(customer.getMobileNumber()).salutation(customer.getSalutation()).build();
		} catch (RuntimeException ex) {
			Log.log("Customer", "transformIndividualEntity", "Exception " + ex, ex);
			return Customer.builder().build();
		}
	}


}
