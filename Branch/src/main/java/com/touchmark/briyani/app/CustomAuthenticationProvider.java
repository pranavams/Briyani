package com.touchmark.briyani.app;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.touchmark.briyani.commons.Log;
import com.touchmark.briyani.user.UserService;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

	@Autowired
	private UserService userService;
	
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String name = authentication.getName();
		String password = authentication.getCredentials().toString();
		try {
			com.touchmark.briyani.user.User user = userService.authenticate(com.touchmark.briyani.user.User.builder().userName(name).password(password).build());
			return new UsernamePasswordAuthenticationToken(user.getUserName(), user.getPassword(), getAuthority(user.getRoles()));
		} catch (Exception ex) {
			Log.error("UserService", "loadUserByUserName", "Exception while Fetching User Details", ex);
			return null;
		}

	}

	private List<SimpleGrantedAuthority> getAuthority(String roles) {
		List<SimpleGrantedAuthority> authorities = new ArrayList<>();
		for (String roleEntity : roles.split(",")) {
			authorities.add(new SimpleGrantedAuthority(roleEntity));
		}
		return authorities;
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}
}