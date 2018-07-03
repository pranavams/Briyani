package com.touchmark.briyani.order;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.touchmark.briyani.commons.Log;
import com.touchmark.briyani.item.ItemEntity;
import com.touchmark.briyani.item.ItemRepository;

@Service
public class OrderService {
	private OrderRepository repository;
	private ItemRepository iRepository;
	private OrderDetailRepository orderDetailRepository;

	@Autowired
	public OrderService(OrderRepository repository, ItemRepository iRepository,
			OrderDetailRepository orderDetailRepository) {
		this.repository = repository;
		this.iRepository = iRepository;
		this.orderDetailRepository = orderDetailRepository;
	}

	public List<Order> getAll() {
		List<OrderEntity> orders = repository.findAll();
		List<OrderEntity> allOrders = getItemsInOrder(orders);
		return Order.builder().build().transformEntities(allOrders);
	}

	private List<OrderEntity> getItemsInOrder(List<OrderEntity> orders) {
		List<OrderEntity> allOrders = new ArrayList<>();
		for (int i = 0; i < orders.size(); i++) {
			OrderEntity tempOrder = orders.get(i);
			List<OrderDetailEntity> orderDetails = orderDetailRepository.findByOrderId(tempOrder.getOrderId());
			Log.log("OrderService", "getAll", "Order ID " + tempOrder.getOrderId());
			Log.log("OrderService", "getAll", "Order details " + orderDetails);
			tempOrder.setOrderDetails(orderDetails);
			allOrders.add(tempOrder);
		}
		return allOrders;
	}

	public OrderEntity save(Order object) {
		OrderEntity orderEntity = object.createEntity();
		orderEntity.setOrderDetails(getOrderDetails(object));
		return this.repository.save(orderEntity);
	}

	private List<OrderDetailEntity> getOrderDetails(Order object) {
		List<OrderDetailEntity> orderDetails = new ArrayList<>();
		for (OrderDetail orderDetail : object.getOrderDetails()) {
			orderDetails.add(OrderDetailEntity.builder().quantity(orderDetail.getQuantity())
					.unitPrice(orderDetail.getUnitPrice()).item(getItemEntity(orderDetail)).build());
		}
		return orderDetails;
	}

	private ItemEntity getItemEntity(OrderDetail orderDetail) {
		List<ItemEntity> items = iRepository.findByName(orderDetail.getItem().getName());
		if (items == null || items.isEmpty())
			throw new RuntimeException("Item Not Found");
		return items.get(0);
	}

	public List<Order> getOrdersForCustomer(String id) {
		long customerID = Long.parseLong(id.substring(4));
		List<OrderEntity> orders = getItemsInOrder(repository.findByCustomerId(customerID));
		return Order.builder().build().transformEntities(orders);
	}

}
