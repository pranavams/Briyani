package com.touchmark.briyani.user;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

@Entity
@Table(name = "actor")
public class UserEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
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

}
