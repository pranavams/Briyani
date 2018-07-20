package com.touchmark.briyani.user;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import org.springframework.security.crypto.bcrypt.BCrypt;

import com.touchmark.briyani.branch.Branch;
import com.touchmark.briyani.commons.Log;
import com.touchmark.briyani.commons.ValueObject;
import com.touchmark.briyani.rider.Rider;

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
	private String userTypeId;
	private ValueObject valueObject;

	public UserEntity createEntity() {
		return UserEntity.builder().firstName(firstName).lastName(lastName).middleName(middleName).password(password)
				.userTypeId(DBID(userType, userTypeId))
				.userType(userType).lastUpdatedDate(OffsetDateTime.now()).roles(roles).userName(userName).build();
	}

	private Long DBID(String userType, String userTypeId) {
		if (userType == null || userTypeId == null) {
			Log.log("User", "transformId id, type ", "Invalid Values " + userType + ", " + userTypeId);
			return null;
		}
		switch (userType.toLowerCase()) {
		case "branch":
			return Branch.builder().id(userTypeId).build().DBID();
		case "rider":
			return Rider.builder().id(userTypeId).build().DBID();
		}
		return null;
	}

	public User transformEntity(UserEntity entity) {
		if (entity == null)
			return User.builder().build();
		try {
			return User.builder().firstName(entity.getFirstName()).id(transformId(entity.getActorId()))
					.lastName(entity.getLastName()).middleName(entity.getMiddleName()).roles(entity.getRoles())
					.userType(entity.getUserType()).userName(entity.getUserName())
					.userTypeId(transformId(entity.getUserTypeId(), entity.getUserType())).build();
		} catch (Exception ex) {
			Log.log("User", "Transform", "Exception " + ex, ex);
			return User.builder().build();
		}
	}

	private String transformId(Long userTypeId, String userType) {
		if (userType == null || userTypeId == null) {
			Log.log("User", "transformId id, type ", "Invalid Values " + userType + ", " + userTypeId);
			return "";
		}
		switch (userType.toLowerCase()) {
		case "branch":
			return Branch.builder().build().transformID(userTypeId);
		}
		return "";
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

	public User createBranchUser(Branch branch) {
		setFirstName(branch.getContactPersonFirstName());
		setLastName(branch.getContactPersonLastName());
		setMiddleName(branch.getContactPersonMiddleName());
		this.password = (BCrypt.hashpw(branch.getPassword(), BCrypt.gensalt()));
		setRoles("BRANCH_USER");
		setUserName(branch.getTelephone());
		setUserType("BRANCH");
		setUserTypeId(branch.getId());
		return this;
	}

	public User createRiderUser(Rider object) {
		setFirstName(object.getRiderPersonFirstName());
		setLastName(object.getRiderPersonLastName());
		setMiddleName(object.getRiderPersonMiddleName());
		this.password = (BCrypt.hashpw(object.getPassword(), BCrypt.gensalt()));
		setRoles("BRANCH_USER");
		setUserName(object.getMobileNumber());
		setUserType("RIDER");
		setUserTypeId(object.getId());
		return this;
	}
}
