package com.touchmark.briyani.customer;

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
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString 

@Entity
@Table(name = "customer")
public class CustomerEntity implements Serializable {

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private long id;

	@Column(name = "firstName")
	private String firstName;

	@Column(name = "lastName")
	private String lastName;

	@Column(name = "middleName")
	private String middleName;
	@Column(name = "salutation")
	private String salutation;
	
	@Column(name = "mobileNumber")
	private String mobileNumber;
	
	@Column(name = "telephoneNumber")
	private String telephoneNumber;
	
	@Column(name = "dateOfBirth")
	private OffsetDateTime dateOfBirth;
	
	@Column(name="email")
	private String email;

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "address_id")
	private AddressEntity address;

}
