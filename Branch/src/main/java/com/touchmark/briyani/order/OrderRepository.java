package com.touchmark.briyani.order;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
	public List<OrderEntity> findByCustomerId(Long customerId);

	@Query(value = "SELECT * FROM ORDER_INFO p WHERE BRANCH_ID = 1? ORDER BY LAST_UPDATED_DATE DESC LIMIT 2", nativeQuery = true)
	List<OrderEntity> findRecent(Long branchId);

	@Query(value = "SELECT * FROM ORDER_INFO WHERE DATE(date_and_time) = DATE(now())", nativeQuery = true)
	public List<OrderEntity> findTodayOrders();

	@Query(value = "SELECT * FROM ORDER_INFO WHERE RIDER_ID = 1? AND DATE(date_and_time) = DATE(now())", nativeQuery = true)
	public List<OrderEntity> findTodayOrdersByRiderId(Long riderId);

	public List<OrderEntity> findByPaymentStatus(String paymentStatus);

	public List<OrderEntity> findByOrderStatus(String orderStatus);

	public List<OrderEntity> findByOrderStatusNot(String orderStatus);

	public List<OrderEntity> findByVesselStatus(String status);

	public List<OrderEntity> findByBranchId(Long branchId);

	public List<OrderEntity> findByRiderId(Long riderId);

	public List<OrderEntity> findByVesselStatusAndRiderId(String vesselStatus, Long riderId);

	public List<OrderEntity> findByOrderStatusAndBranchId(String status, Long branchId);


}
