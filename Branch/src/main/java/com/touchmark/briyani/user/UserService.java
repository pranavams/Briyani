package com.touchmark.briyani.user;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.touchmark.briyani.commons.Log;

@Service(value = "userService")
public class UserService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	private List<SimpleGrantedAuthority> getAuthority(String roles) {
		List<SimpleGrantedAuthority> authorities = new ArrayList<>();
		for (String roleEntity : roles.split(",")) {
			authorities.add(new SimpleGrantedAuthority(roleEntity));
		}
		return authorities;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		try {
			List<UserEntity> findByUserName = userRepository.findByUserName(username);
			UserEntity user = findByUserName.get(0);
			User retrievedUser = new User(user.getUserName(), user.getPassword(), getAuthority(user.getRoles()));
			return retrievedUser;
		} catch (Exception ex) {
			Log.error("UserService", "loadUserByUserName", "Exception while Fetching User Details", ex);
			throw new UsernameNotFoundException("User Not Found");
		}
	}

	public com.touchmark.briyani.user.User findByUsername(String username) {
		try {
			List<UserEntity> findByUserName = userRepository.findByUserName(username);
			UserEntity user = findByUserName.get(0);
			com.touchmark.briyani.user.User retrievedUser = com.touchmark.briyani.user.User.builder().build().transformEntity(user);
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

	public com.touchmark.briyani.user.User authenticate(com.touchmark.briyani.user.User user) {
		List<UserEntity> users = this.userRepository.findByUserName(user.getUserName());
		if(users == null || users.isEmpty())
			throw new RuntimeException("User Not Found");
		Optional<UserEntity> foundUser = users.stream().filter(x -> BCrypt.checkpw(user.getPassword(), x.getPassword())).findFirst();
		return com.touchmark.briyani.user.User.builder().build().transformEntity(foundUser.get());
	}

	public com.touchmark.briyani.user.User update(com.touchmark.briyani.user.User object) {
		UserEntity entity = this.userRepository.findByUserName(object.getUserName()).get(0);
		entity.updateWith(object);
		return com.touchmark.briyani.user.User.builder().build().transformEntity(this.userRepository.saveAndFlush(entity));
	}

}