package com.touchmark.briyani.order;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetailEntity, Long> {
	
	public List<OrderDetailEntity> findByOrderId(Long orderId);
}
