package com.touchmark.briyani.statistics;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.touchmark.briyani.branch.Branch;
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
		statistics.setOverallDue(getDueAmount(overAllOrders));
		statistics.setOverallPaid(getPaidAmount(overAllOrders));
		statistics.setOverallSales(getTotalSales(overAllOrders));
		statistics.setOverallOrders(overAllOrders.size());
		statistics.setOverallSales(getTotalSales(overAllOrders));
		statistics.setOverallNumberOfOrders(overAllOrders.size());
		statistics.setOverallNumberOfPurchaseRequest(overAllOrders.size());

		List<OrderEntity> todayOrders = this.orderRepository.findTodayOrders();
		statistics.setTodayDue(getDueAmount(todayOrders));
		statistics.setTodayOrders(todayOrders.size());
		statistics.setTodayPaid(getPaidAmount(todayOrders));
		statistics.setTodaySales(getTotalSales(todayOrders));
		statistics.setTodayNumberOfOrders(todayOrders.size());
		statistics.setTodayNumberOfPurchaseRequest(todayOrders.size());

		return statistics;
	}

	private float getPaidAmount(List<OrderEntity> todayOrders) {
		return todayOrders
		.stream()
		.filter(x -> isPaid(x.getPaymentStatus()))
		.map(x -> x.getTotalAmount())
		.collect(Collectors.summingDouble(Float::floatValue))
		.floatValue();
	}

	private boolean isPaid(String paymentStatus) {
		if(paymentStatus == null)
			return false;
		return "PAID".equalsIgnoreCase(paymentStatus);
	}

	private float getDueAmount(List<OrderEntity> todayOrders) {
		return todayOrders
		.stream()
		.filter(x -> isDue(x.getPaymentStatus()))
		.map(x -> x.getTotalAmount())
		.collect(Collectors.summingDouble(Float::floatValue))
		.floatValue();
	}

	private boolean isDue(String paymentStatus) {
		if(paymentStatus == null)
			return false;
		return !"PAID".equalsIgnoreCase(paymentStatus);
	}

	private float getTotalSales(List<OrderEntity> orders) {
		return orders.stream().map(x -> x.getTotalAmount()).collect(Collectors.summingDouble(Float::floatValue))
				.floatValue();
	}

	public Map<LocalDate, Statistics> getDateWiseConsolidatedOrdersForBranch(String id) {
		Map<LocalDate, Statistics> dayWiseStatistics = new TreeMap<>();
		for (OrderEntity orderEntity : this.orderRepository.findByBranchId(Branch.builder().id(id).build().DBID())) {
			LocalDate localDate = orderEntity.getDateAndTime().toLocalDate();
			if (dayWiseStatistics.containsKey(localDate)) {
				dayWiseStatistics.put(localDate, calculateStatistics(dayWiseStatistics.get(localDate), orderEntity));
			} else {
				dayWiseStatistics.put(localDate, calculateStatistics(Statistics.builder().build(), orderEntity));
			}
		}

		return dayWiseStatistics;
	}

	private Statistics calculateStatistics(Statistics statistics, OrderEntity orderEntity) {
		statistics.setOverallNumberOfOrders(statistics.getOverallNumberOfOrders() + 1);
		if ("PAID".equalsIgnoreCase(orderEntity.getPaymentStatus()))
			statistics.setOverallPaid(statistics.getOverallPaid() + 1);
		else
			statistics.setOverallDue(statistics.getOverallDue() + 1);

		return statistics;
	}
}
