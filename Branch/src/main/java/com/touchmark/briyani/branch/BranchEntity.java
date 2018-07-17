package com.touchmark.briyani.branch;

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
import com.touchmark.briyani.staff.Staff;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString

@Entity
@Table(name = "branch")
public class BranchEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private long id;

	@Column(name = "name")
	private String name;

	@Column(name = "email")
	private String email;
	
	@Column(name = "latitude")
	private String latitude;
	
	@Column(name = "longitude")
	private String longitude;
	
	@Column(name = "notes")
	private String notes;

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "address_id")
	private AddressEntity address;
	
	@Column(name = "contactPersonFirstName")
	private String contactPersonFirstName;
	@Column(name = "contactPersonLastName")
	private String contactPersonLastName;
	@Column(name = "contactPersonMiddleName")
	private String contactPersonMiddleName;
	@Column(name = "contactPersonSalutation")
	private String contactPersonSalutation;
	
	@Column(name = "mobileNumber")
	private String mobileNumber;
	
	@Column(name = "telephone")
	private String telephone;
	
	@Column(name = "contactPersonNumber")
	private String contactPersonNumber;
	
	@Column(name = "lastUpdatedDate")
	private OffsetDateTime lastUpdatedDate;


	public void updateWith(Branch object) {
		System.out.println("object.getContactPersonNumber()"+object.getContactPersonNumber());
		this.contactPersonFirstName = object.getContactPersonFirstName();
		this.contactPersonLastName = object.getContactPersonLastName();
		this.contactPersonMiddleName = object.getContactPersonMiddleName();
		this.mobileNumber = object.getMobileNumber();
		this.contactPersonNumber = object.getContactPersonNumber();
		this.email = object.getEmail();
		this.address.updateWith(object.getAddress());
		this.lastUpdatedDate = OffsetDateTime.now();
		this.name = object.getName();
		this.longitude = object.getLongitude();
		this.latitude = object.getLatitude();
		this.telephone= object.getTelephone();
		this.notes = object.getNotes();
	}
}
