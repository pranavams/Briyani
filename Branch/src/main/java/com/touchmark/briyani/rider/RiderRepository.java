package com.touchmark.briyani.rider;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RiderRepository extends JpaRepository<RiderEntity, Long> {
	@Query(value = "SELECT * FROM RIDER p ORDER BY LAST_UPDATED_DATE DESC LIMIT 2",  nativeQuery = true)
	List<RiderEntity> findRecent();
}
