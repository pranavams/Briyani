package com.touchmark.briyani.user;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
			Log.log("UserService", "LoadUser", "User Name " + username);
			List<UserEntity> findByUserName = userRepository.findByUserName(username);
			UserEntity user = findByUserName.get(0);
			User retrievedUser = new User(user.getUserName(), user.getPassword(), getAuthority(user.getRoles()));
			Log.log("UserService", "LoadUser", "User details " + retrievedUser);
			return retrievedUser;
		} catch (Exception ex) {
			Log.error("UserService", "loadUserByUserName", "Exception while Fetching User Details", ex);
			throw new UsernameNotFoundException("User Not Found");
		}
	}
	
	public UserEntity save(com.touchmark.briyani.user.User user) {
		return this.userRepository.save(user.createEntity());
	}
}