package com.touchmark.briyani.rider;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
	List<UserEntity> findByUserName(String username);
}
