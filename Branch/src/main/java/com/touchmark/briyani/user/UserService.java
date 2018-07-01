package com.touchmark.briyani.user;

import java.util.ArrayList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service(value = "userService")
public class UserService implements UserDetailsService {
	
	@Autowired
	private com.touchmark.briyani.user.UserRepository userRepository;

	private List<SimpleGrantedAuthority> getAuthority(String roles) {
		List<SimpleGrantedAuthority> authorities = new ArrayList<>();
		for (String roleEntity : roles.split(",")) {
			authorities.add(new SimpleGrantedAuthority(roleEntity));
		}
		return authorities;
	}

	public List<UserEntity> findAll() {
		List<UserEntity> list = new ArrayList<>();
		userRepository.findAll().iterator().forEachRemaining(list::add);
		return list;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		List<UserEntity> findByUserName = userRepository.findByUserName(username);
		UserEntity user = findByUserName.get(0);
		return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(), getAuthority(user.getRoles()));
	}
}