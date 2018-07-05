package com.touchmark.briyani.staff;

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
public class Staff {

	private String id;
	private String firstName;
	private String lastName;
	private String middleName;
	private String gender;
	private String salutation;
	private String mobileNumber;
	private String email;
	private OffsetDateTime dateOfBirth;
	private OffsetDateTime dateOfJoin;
	private String role;
	private String password;
	private String notes;
	private Address address;

	public Long getDatabaseID() {
		return Long.parseLong(id.substring(5));
	}

	public StaffEntity createEntity() {
		return StaffEntity.builder().dateOfBirth(dateOfBirth).firstName(firstName).email(email).lastName(lastName)
				.middleName(middleName).mobileNumber(mobileNumber).salutation(salutation).gender(gender).notes(notes)
				.role(role).lastUpdatedDate(OffsetDateTime.now())
				// .dateOfJoin(dateOfJoin)
				// .address(address.createEntity())
				.build();
	}

	public List<Staff> transformEntities(List<StaffEntity> staff) {
		ArrayList<Staff> responseStaff = new ArrayList<Staff>();
		for (StaffEntity staffEntity : staff) {
			responseStaff.add(Staff.builder().id(transformId(staffEntity.getId())).email(staffEntity.getEmail())
					.gender(staffEntity.getGender()).dateOfJoin(staffEntity.getDateOfJoin()).role(staffEntity.getRole())
					.notes(staffEntity.getNotes()).dateOfBirth(staffEntity.getDateOfBirth())
					.firstName(staffEntity.getFirstName()).lastName(staffEntity.getLastName())
					.middleName(staffEntity.getMiddleName()).mobileNumber(staffEntity.getMobileNumber())
					.salutation(staffEntity.getSalutation())
					// .address(Address.builder().build().transform(staffEntity.getAddress()))
					.build());
		}
		return responseStaff;
	}

	private String transformId(long id) {
		return "STAFF" + id;
	}

	public String getFirstName() {
		return firstName == null ? "" : firstName;
	}

	public String getLastName() {
		return lastName == null ? "" : lastName;
	}

	public String getMiddleName() {
		return middleName == null ? "" : middleName;
	}

	public String getSalutation() {
		return salutation == null ? "" : salutation;
	}

	public String getMobileNumber() {
		return mobileNumber == null ? "" : mobileNumber;
	}

	public String getEmail() {
		return email == null ? "" : email;
	}

	public String getNotes() {
		return notes == null ? "" : notes;
	}

}
