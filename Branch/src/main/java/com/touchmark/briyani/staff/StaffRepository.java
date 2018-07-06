package com.touchmark.briyani.staff;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface StaffRepository extends JpaRepository<StaffEntity, Long> {
	@Query(value = "SELECT * FROM STAFF p ORDER BY LAST_UPDATED_DATE DESC LIMIT 2",  nativeQuery = true)
	List<StaffEntity> findRecent();
}
