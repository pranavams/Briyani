package com.touchmark.briyani.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.touchmark.briyani.commons.Log;

@Service(value = "userService")
public class UserService{

	@Autowired
	private UserRepository userRepository;

	public com.touchmark.briyani.user.User findByUsername(String username) {
		try {
			Log.log("UserService", "LoadUser", "User Name " + username);
			List<UserEntity> findByUserName = userRepository.findByUserName(username);
			UserEntity user = findByUserName.get(0);
			com.touchmark.briyani.user.User retrievedUser = com.touchmark.briyani.user.User.builder().build().transformEntity(user);
			Log.log("UserService", "LoadUser", "User details " + retrievedUser);
			return retrievedUser;
		} catch (Exception ex) {
			Log.error("UserService", "findByUserName", "Exception while Fetching User Details", ex);
			throw new RuntimeException("User Not Found");
		}
	}

	public UserEntity save(com.touchmark.briyani.user.User user) {
		return this.userRepository.save(user.createEntity());
	}

	public List<com.touchmark.briyani.user.User> getAll() {
		return com.touchmark.briyani.user.User.builder().build().transformEntity(userRepository.findAll());
	}

	public com.touchmark.briyani.user.User get(String id) {
		return com.touchmark.briyani.user.User.builder().build().transformEntity(userRepository
				.findById(com.touchmark.briyani.user.User.builder().id(id).build().DBID()).get());
	}

	public List<com.touchmark.briyani.user.User> getAllByUserType(String type) {
		return com.touchmark.briyani.user.User.builder().build().transformEntity(userRepository.findByUserType(type));
	}

}