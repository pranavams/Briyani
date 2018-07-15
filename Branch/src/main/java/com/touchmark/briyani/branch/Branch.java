package com.touchmark.briyani.branch;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

import com.touchmark.briyani.commons.Address;
import com.touchmark.briyani.commons.AddressEntity;
import com.touchmark.briyani.commons.Validator;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Branch {
	private String id;
	private String name;
	private String email;
	private String latitude;
	private String longitude;
	private String notes;
	private Address address;
	private String contactPersonFirstName;
	private String contactPersonLastName;
	private String contactPersonMiddleName;
	private String contactPersonSalutation;
	private String mobileNumber;
	private String telephone;
	private String contactPersonNumber;

	public BranchEntity createEntity() {
		AddressEntity addressEntity = AddressEntity.builder().area(address.getArea()).city(address.getCity())
				.country(address.getCountry()).doorNumber(address.getDoorNumber()).state(address.getState())
				.street(address.getStreet()).zipcode(address.getZipcode()).build();
		return BranchEntity.builder().contactPersonFirstName(contactPersonFirstName)
				.lastUpdatedDate(OffsetDateTime.now()).contactPersonLastName(contactPersonLastName)
				.contactPersonMiddleName(contactPersonMiddleName).contactPersonNumber(contactPersonNumber)
				.contactPersonSalutation(contactPersonSalutation).email(email).latitude(latitude).longitude(longitude)
				.mobileNumber(mobileNumber).name(name).notes(notes).telephone(telephone).address(addressEntity).build();
	}

	public Branch transformEntities(BranchEntity entity) {
		if (entity == null)
			return Branch.builder().build();
		return Branch.builder().id(transformID(entity.getId())).name(entity.getName()).email(entity.getEmail())
				.latitude(entity.getLatitude()).longitude(entity.getLongitude()).notes(entity.getNotes())
				.contactPersonFirstName(entity.getContactPersonFirstName())
				.contactPersonLastName(entity.getContactPersonLastName())
				.contactPersonMiddleName(entity.getContactPersonMiddleName())
				.contactPersonNumber(entity.getContactPersonNumber())
				.contactPersonSalutation(entity.getContactPersonSalutation()).mobileNumber(entity.getMobileNumber())
				.telephone(entity.getTelephone()).address(Address.builder().build().transform(entity.getAddress()))
				.build();
	}

	private String transformID(long id) {
		return "BRAN" + id;
	}

	public List<Branch> transformEntities(List<BranchEntity> entities) {
		List<Branch> branches = new ArrayList<>(entities.size());
		for (BranchEntity branchEntity : entities) {
			branches.add(transformEntities(branchEntity));
		}
		return branches;
	}

	public Long DBID() {
		return Long.parseLong(id.substring(4));
	}

	public String getContactPersonSalutation() {
		return this.contactPersonSalutation == null ? "" : this.contactPersonSalutation;
	}

	public String getContactPersonFirstName() {
		return this.contactPersonFirstName == null ? "" : this.contactPersonFirstName;
	}

	public String getContactPersonMiddleName() {
		return this.contactPersonMiddleName == null ? "" : this.contactPersonMiddleName;
	}

	public String getContactPersonLastName() {
		return this.contactPersonLastName == null ? "" : this.contactPersonLastName;
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

		if (Validator.isStringWithOutValue(this.name))
			errors.add("Invalid Branch Name");

		if (Validator.isStringWithOutValue(this.telephone))
			errors.add("Invalid Telephone Number");

		if (Validator.isInValidAddress(this.address))
			errors.add("Invalid Address");

		if (Validator.isStringWithOutValue(this.contactPersonFirstName))
			errors.add("Invalid Contact Person Name");

		if (Validator.isStringWithOutValue(this.latitude))
			errors.add("Invalid Latitude");

		if (Validator.isStringWithOutValue(this.longitude))
			errors.add("Invalid Longitude");

		if (Validator.isStringWithOutValue(this.notes))
			errors.add("Invalid Notes");

		Validator.throwExceptionWhenNotEmpty(errors);
	}

	private void validateForID() {
		List<String> errors = new ArrayList<>();
		if (Validator.isStringWithOutValue(this.id))
			errors.add("Invalid Branch ID");

		Validator.throwExceptionWhenNotEmpty(errors);
	}
}
