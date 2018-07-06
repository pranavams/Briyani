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

	@Column(name = "riderIdCardNo")
	private String riderIdCardNo;

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "address_id")
	private AddressEntity address;

	@Column(name = "lastUpdatedDate")
	private OffsetDateTime lastUpdatedDate;
}
