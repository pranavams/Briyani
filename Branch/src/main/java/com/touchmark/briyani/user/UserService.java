package com.touchmark.briyani.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service(value = "userService")
public class UserService {//implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

//	private List<SimpleGrantedAuthority> getAuthority(String roles) {
//		List<SimpleGrantedAuthority> authorities = new ArrayList<>();
//		for (String roleEntity : roles.split(",")) {
//			authorities.add(new SimpleGrantedAuthority(roleEntity));
//		}
//		return authorities;
//	}
//
//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		try {
//			List<UserEntity> findByUserName = userRepository.findByUserName(username);
//			UserEntity user = findByUserName.get(0);
//			return new User(user.getUserName(), user.getPassword(), getAuthority(user.getRoles()));
//		} catch (Exception ex) {
//			Log.log("UserService", "loadUserByUserName", "Exception while Fetching User Details", ex);
//			throw new UsernameNotFoundException("User Not Found");
//		}
//	}
}