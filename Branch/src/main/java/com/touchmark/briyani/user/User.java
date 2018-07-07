package com.touchmark.briyani.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class User {

	private String id;
	private String firstName;
	private String middleName;
	private String lastName;
	private String userName;
	private String password;
	private String roles;

	public UserEntity createEntity() {
		return UserEntity.builder().firstName(firstName).lastName(lastName).middleName(middleName).password(password)
				.roles(roles).userName(userName).build();
	}

	public User transformEntity(UserEntity entity) {
		return User.builder().firstName(entity.getFirstName()).id(transformId(entity.getActorId()))
				.lastName(entity.getLastName()).middleName(entity.getMiddleName()).roles(entity.getRoles())
				.userName(entity.getUserName()).build();
	}

	private String transformId(Long actorId) {
		return "USER" + actorId;
	}

}
