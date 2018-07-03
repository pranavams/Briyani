package com.touchmark.briyani.order;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
	public List<OrderEntity> findByCustomerId(Long customerId); 
}
