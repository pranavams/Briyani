package com.touchmark.briyani.branch;

import java.io.Serializable;

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
@Table(name = "branch")
public class BranchEntity implements Serializable {

	@GeneratedValue(strategy = GenerationType.AUTO)
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
	
	@Column(name = "contactPersonNumnber")
	private String contactPersonNumber;
	
}
