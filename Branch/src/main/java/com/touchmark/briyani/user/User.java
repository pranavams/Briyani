package com.touchmark.briyani.user;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString(exclude = { "password" })
public class User {

	private String id;
	private String firstName;
	private String middleName;
	private String lastName;
	private String userName;
	private String password;
	private String roles;
	private String userType;

	public UserEntity createEntity() {
		return UserEntity.builder().firstName(firstName).lastName(lastName).middleName(middleName).password(password)
				.userType(userType).lastUpdatedDate(OffsetDateTime.now()).roles(roles).userName(userName).build();
	}

	public User transformEntity(UserEntity entity) {
		if (entity == null)
			return User.builder().build();
		return User.builder().firstName(entity.getFirstName()).id(transformId(entity.getActorId()))
				.lastName(entity.getLastName()).middleName(entity.getMiddleName()).roles(entity.getRoles())
				.userType(entity.getUserType()).userName(entity.getUserName()).build();
	}

	private String transformId(Long actorId) {
		return "USER" + actorId;
	}

	public Long DBID() {
		return Long.parseLong(id.substring(4));
	}

	public List<User> transformEntity(List<UserEntity> userEntities) {
		List<User> users = new ArrayList<>(userEntities.size());
		for (UserEntity userEntity : userEntities) {
			users.add(transformEntity(userEntity));
		}
		return users;
	}

	public void setPassword(String password) {
		this.password = new String(Base64.getDecoder().decode(password));
	}

	public void getPassword(String password) {
		this.password = new String(Base64.getDecoder().decode(password));
	}
}
