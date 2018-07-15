package com.touchmark.briyani.rider;

import java.io.Serializable;
import java.time.OffsetDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.touchmark.briyani.commons.AddressEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

@Entity
@Table(name = "rider")
public class RiderEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private long id;

	@Column(name = "department_type")
	private String departmentType;

	@Column(name = "riderPersonFirstName")
	private String riderPersonFirstName;

	@Column(name = "riderPersonLastName")
	private String riderPersonLastName;

	@Column(name = "riderPersonMiddleName")
	private String riderPersonMiddleName;
	@Column(name = "riderPersonSalutation")
	private String riderPersonSalutation;
	@Column(name = "dateOfBirth")
	private OffsetDateTime dateOfBirth;

	@Column(name = "mobileNumber")
	private String mobileNumber;

	@Column(name = "riderPersonNumber")
	private String riderPersonNumber;

	@Column(name = "email")
	private String email;

	@Column(name = "gender")
	private String gender;

	@Column(name = "zone")
	private String zone;

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "address_id")
	private AddressEntity address;

	@Column(name = "lastUpdatedDate")
	private OffsetDateTime lastUpdatedDate;

	@Column(name = "riderIdCardNo")
	private String riderIdCardNo;

	@Column(name = "vehicleType")
	private String vehicleType;

	@Column(name = "vehicleModel")
	private String vehicleModel;

	@Column(name = "vehicleNumber")
	private String vehicleNumber;

	@Column(name = "licenseNumber")
	private String licenseNumber;

	@Column(name = "licenseType")
	private String licenseType;

	@Column(name = "licenseIssueDate")
	private OffsetDateTime licenseIssueDate;

	@Column(name = "licenseExpiryDate")
	private OffsetDateTime licenseExpiryDate;

	public void updateWith(Rider object) {
		this.departmentType = object.getDepartmentType();
		this.riderPersonFirstName = object.getRiderPersonFirstName();
		this.riderPersonMiddleName = object.getRiderPersonMiddleName();
		this.riderPersonLastName = object.getRiderPersonLastName();
		this.mobileNumber = object.getMobileNumber();
		this.riderPersonNumber = object.getRiderPersonNumber();
		this.email = object.getEmail();
		this.address.updateWith(object.getAddress());
		this.lastUpdatedDate = OffsetDateTime.now();
		this.riderIdCardNo = object.getRiderIdCardNo();
		this.vehicleType = object.getVehicleType();
		this.vehicleModel = object.getVehicleModel();
		this.vehicleNumber = object.getVehicleNumber();
		this.licenseType = object.getLicenseType();
		this.licenseIssueDate = object.getLicenseIssueDate();
		this.licenseExpiryDate = object.getLicenseExpiryDate();
		this.licenseNumber = object.getLicenseNumber();
		this.gender = object.getGender();
	}
}
