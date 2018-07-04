package com.touchmark.briyani.user;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

//	@Query("SELECT DISTINCT user FROM ACTOR user " + "INNER JOIN FETCH user.authorities AS authorities "
//			+ "WHERE user.username = :username")
//	UserEntity findByUsername(@Param("username") String username);

	public List<UserEntity> findByUserName(String userName);
}
