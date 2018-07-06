package com.touchmark.briyani.order;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.touchmark.briyani.branch.Branch;
import com.touchmark.briyani.branch.BranchEntity;
import com.touchmark.briyani.branch.BranchRepository;
import com.touchmark.briyani.commons.Log;
import com.touchmark.briyani.customer.Customer;
import com.touchmark.briyani.customer.CustomerEntity;
import com.touchmark.briyani.customer.CustomerRepository;
import com.touchmark.briyani.item.Item;
import com.touchmark.briyani.item.ItemEntity;
import com.touchmark.briyani.item.ItemRepository;

@Service
public class OrderService {
	private OrderRepository repository;
	private ItemRepository iRepository;
	private OrderDetailRepository orderDetailRepository;
	private BranchRepository branchRepository;
	private CustomerRepository customerRepository;

	@Autowired
	public OrderService(OrderRepository repository, ItemRepository iRepository,
			OrderDetailRepository orderDetailRepository, BranchRepository branchRepository,
			CustomerRepository customerRepository) {
		this.repository = repository;
		this.iRepository = iRepository;
		this.orderDetailRepository = orderDetailRepository;
		this.branchRepository = branchRepository;
		this.customerRepository = customerRepository;
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

	public OrderEntity createOrder(CreateOrder object) {
		BranchEntity branch = this.branchRepository
				.findById(Branch.builder().id(object.getBranchID()).build().getDatabaseID()).get();
		CustomerEntity customer = this.customerRepository
				.findById(Customer.builder().id(object.getCustomerID()).build().getDatabaseID()).get();
		OrderEntity order = OrderEntity.builder().branch(branch).customer(customer).couponCode(object.getCouponCode())
				.dateAndTime(OffsetDateTime.now()).deliveryAddress(object.getDeliveryAddress().createEntity()).build();

		List<OrderDetailEntity> orderDetails = new ArrayList<>(object.getOrderDetails().size());

		float totalPrice = 0;

		for (OrderDetail orderDetail : object.getOrderDetails()) {
			ItemEntity item = iRepository
					.findById(Item.builder().id(orderDetail.getItem().getId()).build().getDatabaseID()).get();
			totalPrice += item.getPrice() * orderDetail.getQuantity();
			orderDetails.add(OrderDetailEntity.builder().item(item).quantity(orderDetail.getQuantity())
					.unitPrice(item.getPrice()).orderId(order.getOrderId()).build());
		}
		order.setTaxAmount(totalPrice * 0.06f);
		order.setTaxPercentage(6);
		order.setTotalAmount(totalPrice * 1.06f);
		repository.save(order);

		for (OrderDetail orderDetail : object.getOrderDetails()) {
			ItemEntity item = iRepository
					.findById(Item.builder().id(orderDetail.getItem().getId()).build().getDatabaseID()).get();
			totalPrice += item.getPrice() * orderDetail.getQuantity();
			orderDetailRepository.save(OrderDetailEntity.builder().item(item).quantity(orderDetail.getQuantity())
					.unitPrice(item.getPrice()).orderId(order.getOrderId()).build());
		}

		Log.log("OrderService", "CreateOrder", "Order To Create " + order);

		return order;
	}

	public List<Order> getRecent() {
		return Order.builder().build().transformEntities(repository.findRecent());
	}
	
	public List<Order> getTodayOrders() {
		return Order.builder().build().transformEntities(repository.findTodayOrders());		
	}

}
