package com.touchmark.briyani.statistics;

import java.util.List;
import java.util.stream.Collectors;

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
		statistics.setOverallOrders(overAllOrders.size());
		statistics.setOverallNumberOfOrders(overAllOrders.size());
		statistics.setOverallNumberOfPurchaseRequest(overAllOrders.size());

		List<OrderEntity> todayOrders = this.orderRepository.findTodayOrders();
		Log.log("StatisticsService", "Get", "Today's Orders " + todayOrders);
		// statistics.setTodaySales(getTotalSales(overAllOrders));
		statistics.setTodayNumberOfOrders(overAllOrders.size());
		statistics.setTodayNumberOfPurchaseRequest(overAllOrders.size());

		return statistics;
	}

	private float getTotalSales(List<OrderEntity> orders) {
		return orders.stream().map(x -> x.getTotalAmount()).collect(Collectors.summingDouble(Float::floatValue))
				.floatValue();
	}
}
