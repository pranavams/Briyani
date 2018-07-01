package com.touchmark.briyani.order;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

import com.touchmark.briyani.commons.Address;
import com.touchmark.briyani.commons.AddressEntity;
import com.touchmark.briyani.commons.Log;
import com.touchmark.briyani.item.Item;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Order {

	private String orderId;
	private String couponCode;
	private float taxPercentage, taxAmount, totalAmount;
	private String userName;
	private String paymentStatus;
	private Address deliveryAddress;
	private OffsetDateTime dateAndTime;

	private List<OrderDetail> orderDetails;

	public OrderEntity createEntity() {
		AddressEntity addressEntity = AddressEntity.builder().area(deliveryAddress.getArea())
				.city(deliveryAddress.getCity()).country(deliveryAddress.getCountry())
				.doorNumber(deliveryAddress.getDoorNumber()).state(deliveryAddress.getState())
				.street(deliveryAddress.getStreet()).zipcode(deliveryAddress.getZipcode()).build();
		return OrderEntity.builder().couponCode(couponCode).dateAndTime(dateAndTime).deliveryAddress(addressEntity)
				.paymentStatus(paymentStatus).taxPercentage(taxPercentage).taxAmount(taxAmount).totalAmount(totalAmount)
				.userName(userName)
				// .orderDetails(orderDetails)
				.build();
	}

	public Order transformEntity(OrderEntity entity) {
		Log.log("Order", "transformEntity", "Order Received " + entity);

		deliveryAddress = Address.builder().area(entity.getDeliveryAddress().getArea())
				.city(entity.getDeliveryAddress().getCity()).country(entity.getDeliveryAddress().getCountry())
				.doorNumber(entity.getDeliveryAddress().getDoorNumber()).state(entity.getDeliveryAddress().getState())
				.street(entity.getDeliveryAddress().getStreet()).zipcode(entity.getDeliveryAddress().getZipcode())
				.build();

		List<OrderDetail> orderDetails = new ArrayList<>();
		for (OrderDetailEntity item : entity.getOrderDetails()) {
			orderDetails.add(OrderDetail.builder()
					.item(Item.builder().menuName(item.getItem().getMenu().getName())
							.description(item.getItem().getDescription()).id(transformItemId(item.getItem().getId()))
							.name(item.getItem().getName()).price(item.getItem().getPrice()).build())
					.quantity(item.getQuantity()).unitPrice(item.getUnitPrice()).build());
		}
		return Order.builder()
				.deliveryAddress(deliveryAddress)
				.couponCode(entity.getCouponCode()).dateAndTime(entity.getDateAndTime())
				.orderId(transformId(entity.getOrderId())).paymentStatus(entity.getPaymentStatus())
				.taxAmount(entity.getTaxAmount()).taxPercentage(entity.getTaxPercentage())
				.totalAmount(entity.getTotalAmount()).userName(entity.getUserName()).deliveryAddress(deliveryAddress)
				.orderDetails(orderDetails).build();

	}

	private String transformItemId(long id) {
		return "ITM-" + id;
	}

	private String transformId(long orderId) {
		return "ORD-" + orderId;
	}

	public List<Order> transformEntities(List<OrderEntity> entities) {
		List<Order> orders = new ArrayList<>(entities.size());
		for (OrderEntity rdierEntity : entities) {
			orders.add(transformEntity(rdierEntity));
		}
		return orders;
	}
}
