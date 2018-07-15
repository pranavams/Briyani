package com.touchmark.briyani.customer;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CustomerRepository extends JpaRepository<CustomerEntity, Long> {
	@Query(value = "SELECT p FROM CUSTOMER p ORDER BY LAST_UPDATED_DATE DESC LIMIT 2",  nativeQuery = true)
	List<CustomerEntity> findRecent();
}
