package com.touchmark.briyani.statistics;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.touchmark.briyani.commons.Log;
import com.touchmark.briyani.order.OrderEntity;
import com.touchmark.briyani.order.OrderRepository;

@Service
public class StatisticsService {
	
	private OrderRepository orderRepository;

	@Autowired
	public StatisticsService(OrderRepository orderRepository) {
		this.orderRepository = orderRepository;
	}


	public Statistics get() {
		Statistics statistics = Statistics.builder().build();
		List<OrderEntity> overAllOrders = this.orderRepository.findAll();
		statistics.setOverallSales(getTotalSales(overAllOrders));
		statistics.setOverallNumberOfOrders(overAllOrders.size());
		statistics.setOverallNumberOfPurchaseRequest(overAllOrders.size());
		
		List<OrderEntity> todayOrders = this.orderRepository.findTodayOrders();
		Log.log("StatisticsService", "Get", "Today's Orders " + todayOrders);
		//statistics.setTodaySales(getTotalSales(overAllOrders));
		statistics.setTodayNumberOfOrders(overAllOrders.size());
		statistics.setTodayNumberOfPurchaseRequest(overAllOrders.size());

		return statistics;
	}


	private float getTotalSales(List<OrderEntity> orders) {
		float sumTotal = 0;
		for (OrderEntity orderEntity : orders) {
			sumTotal += orderEntity.getTotalAmount();
		}
		return sumTotal;
	}
}
