package com.touchmark.briyani.rider;

import java.io.Serializable;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

import com.touchmark.briyani.commons.Address;
import com.touchmark.briyani.commons.AddressEntity;
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
public class Rider implements Serializable {
	private static final long serialVersionUID = 1L;
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
	private String vehicleType;
	private String vehicleModel;
	private String vehicleNumber;
	private String licenseNumber;
	private String licenseType;
	private OffsetDateTime licenseIssueDate;
	private OffsetDateTime licenseExpiryDate;
	private String password;

	public RiderEntity createEntity() {
		AddressEntity addressEntity = AddressEntity.builder().area(address.getArea()).city(address.getCity())
				.country(address.getCountry()).doorNumber(address.getDoorNumber()).state(address.getState())
				.street(address.getStreet()).zipcode(address.getZipcode()).build();
		return RiderEntity.builder().riderPersonFirstName(riderPersonFirstName).dateOfBirth(dateOfBirth)
				.departmentType(departmentType).lastUpdatedDate(OffsetDateTime.now())
				.riderPersonLastName(riderPersonLastName).riderPersonMiddleName(riderPersonMiddleName)
				.riderPersonNumber(riderPersonNumber).riderPersonSalutation(riderPersonSalutation).email(email)
				.vehicleModel(vehicleModel).vehicleNumber(vehicleNumber).vehicleType(vehicleType)
				.licenseExpiryDate(licenseExpiryDate).licenseIssueDate(licenseIssueDate).licenseNumber(licenseNumber)
				.licenseType(licenseType).mobileNumber(mobileNumber).address(addressEntity).build();
	}

	public Rider transformEntities(RiderEntity entity) {
		if (entity == null)
			Rider.builder().build();
		try {
			return Rider.builder().id(transformId(entity.getId(), entity.getDepartmentType())).email(entity.getEmail())
					.dateOfBirth(entity.getDateOfBirth()).riderPersonSalutation(entity.getRiderPersonSalutation())
					.riderPersonFirstName(entity.getRiderPersonFirstName())
					.riderPersonLastName(entity.getRiderPersonLastName())
					.riderPersonMiddleName(entity.getRiderPersonMiddleName())
					.riderPersonNumber(entity.getRiderPersonNumber()).departmentType(entity.getDepartmentType())
					.gender(entity.getGender()).mobileNumber(entity.getMobileNumber())
					.riderIdCardNo(entity.getRiderIdCardNo()).zone(entity.getZone())
					.vehicleModel(entity.getVehicleModel()).vehicleNumber(entity.getVehicleNumber())
					.vehicleType(entity.getVehicleType()).licenseExpiryDate(entity.getLicenseExpiryDate())
					.licenseIssueDate(entity.getLicenseIssueDate()).licenseNumber(entity.getLicenseNumber())
					.licenseType(entity.getLicenseType())
					.address(Address.builder().build().transform(entity.getAddress())).build();
		} catch (Exception ex) {
			Log.log("Rider", "Transform", "Exception " + ex, ex);
			return Rider.builder().build();
		}
	}

	private String transformId(long id, String departmentType) {
		if ("Branch Rider".equalsIgnoreCase(departmentType))
			return "BRRI" + id;
		else
			return "ENDRI" + id;
	}

	public List<Rider> transformEntities(List<RiderEntity> entities) {
		List<Rider> riders = new ArrayList<>(entities.size());
		for (RiderEntity rdierEntity : entities) {
			riders.add(transformEntities(rdierEntity));
		}
		return riders;
	}

	public Long DBID() {
		if (id.contains("BRRI"))
			return Long.parseLong(id.substring(4));
		else if (id.contains("ENDRI"))
			return Long.parseLong(id.substring(5));
		else
			return 0L;

	}

	void validateForUpdation() {
		validateForCreation();
		validateStaffID();
	}

	void validateForDeletion() {
		validateStaffID();
	}

	void validateForCreation() {
		List<String> errors = new ArrayList<>();

		if (Validator.isStringWithOutValue(this.riderPersonFirstName))
			errors.add("Invalid First Name");

		if (Validator.isStringWithOutValue(this.riderPersonLastName))
			errors.add("Invalid Last Name");

		if (Validator.isInValidMobileNumber(this.mobileNumber))
			errors.add("Invalid MobileNumber");

		if (Validator.isInValidGender(this.gender))
			errors.add("Invalid Gender");

		if (Validator.isInValidAddress(this.address))
			errors.add("Invalid Address");

		if (Validator.isStringWithOutValue(this.vehicleNumber))
			errors.add("Invalid Vehicle Number");

		if (Validator.isStringWithOutValue(this.licenseNumber))
			errors.add("Invalid license Number");

		if (Validator.isInValidLicenseIssueDate(this.licenseIssueDate))
			errors.add("Invalid license Issue Date");

		if (Validator.isInValidLicenseExpiryDate(this.licenseExpiryDate, this.licenseIssueDate))
			errors.add("Invalid Exipiry Date");

		if (Validator.isInvalidPassword(this.password))
			errors.add("Invalid Password");

		Validator.throwExceptionWhenNotEmpty(errors);
	}

	private void validateStaffID() {
		List<String> errors = new ArrayList<>();
		if (Validator.isStringWithOutValue(this.id))
			errors.add("Invalid Staff ID");
		Validator.throwExceptionWhenNotEmpty(errors);
	}

}
