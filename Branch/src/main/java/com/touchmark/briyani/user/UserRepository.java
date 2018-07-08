package com.touchmark.briyani.user;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
	public List<UserEntity> findByUserName(String userName);
	public List<UserEntity> findByUserType(String type);
}
