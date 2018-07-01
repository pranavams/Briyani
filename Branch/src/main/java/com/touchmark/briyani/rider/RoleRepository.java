package com.touchmark.briyani.rider;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<UserEntity, Long> {
}
