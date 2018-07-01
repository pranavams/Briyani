package com.touchmark.briyani.order;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.touchmark.briyani.item.ItemEntity;
import com.touchmark.briyani.item.ItemRepository;

@Service
public class OrderService {
	private OrderRepository repository;
	private ItemRepository iRepository;

	@Autowired
	public OrderService(OrderRepository repository, ItemRepository iRepository) {
		this.repository = repository;
		this.iRepository = iRepository;
	}

	public List<Order> getAll() {
		return Order.builder().build().transformEntities(repository.findAll());
	}

	public OrderEntity save(Order object) {
		OrderEntity orderEntity = object.createEntity();
		orderEntity.setOrderDetails(getOrderDetails(object));
		return this.repository.save(orderEntity);
	}

	private Collection<OrderDetailEntity> getOrderDetails(Order object) {
		Collection<OrderDetailEntity> orderDetails = new ArrayList<>();
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

}
