package com.touchmark.briyani.user;

import java.time.OffsetDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

@Entity
@Table(name = "actor", uniqueConstraints = @UniqueConstraint(columnNames = {"userName"}))
public class UserEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "actorId")
	private Long actorId;

	@Column(name = "firstName")
	private String firstName;

	@Column(name = "middleName")
	private String middleName;

	@Column(name = "lastName")
	private String lastName;

	@Column(name = "userName")
	private String userName;
	
	@Column(name = "password")
	private String password;

	@Column(name = "roles")
	private String roles;
	
	@Column(name = "userType")
	private String userType;

	@Column(name = "userTypeId")
	private Long userTypeId;
	
	@Column(name = "lastUpdatedDate")
	private OffsetDateTime lastUpdatedDate;

	public void updateWith(User object) {
		this.firstName = object.getFirstName();
		this.middleName = object.getMiddleName();
		this.lastName = object.getLastName();
		this.password = object.getPassword();
		this.roles = object.getRoles();
		this.userType = object.getUserType();
	}
}
