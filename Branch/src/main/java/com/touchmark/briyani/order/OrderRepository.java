package com.touchmark.briyani.order;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
	public List<OrderEntity> findByCustomerId(Long customerId);

	@Query(value = "SELECT * FROM ORDER_INFO p ORDER BY LAST_UPDATED_DATE DESC LIMIT 2",  nativeQuery = true)
	List<OrderEntity> findRecent();

	@Query (value = "SELECT * FROM ORDER_INFO WHERE DATE(date_and_time) = DATE(now())", nativeQuery = true)
	public List<OrderEntity> findTodayOrders();
	
	
	public List<OrderEntity> findByPaymentStatus(String paymentStatus);
	
	public List<OrderEntity> findByPaymentStatusNot(String paymentStatus);
}
