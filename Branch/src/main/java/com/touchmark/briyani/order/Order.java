package com.touchmark.briyani.order;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

import com.touchmark.briyani.branch.Branch;
import com.touchmark.briyani.commons.Address;
import com.touchmark.briyani.commons.AddressEntity;
import com.touchmark.briyani.commons.Log;
import com.touchmark.briyani.customer.Customer;
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
	private String orderStatus;
	private OffsetDateTime dateAndTime;
	private Branch branch;
	private Customer customer;
	private Address deliveryAddress;
	private int numberOfVessels;
	private String vesselStatus;

	private List<OrderDetail> orderDetails;

	public OrderEntity createEntity() {
		AddressEntity addressEntity = AddressEntity.builder().area(deliveryAddress.getArea())
				.city(deliveryAddress.getCity()).country(deliveryAddress.getCountry())
				.doorNumber(deliveryAddress.getDoorNumber()).state(deliveryAddress.getState())
				.street(deliveryAddress.getStreet()).zipcode(deliveryAddress.getZipcode()).build();

		List<OrderDetailEntity> orders = new ArrayList<>();

		for (OrderDetail orderDetail : orderDetails) {
			orders.add(OrderDetailEntity.builder().quantity(orderDetail.getQuantity())
					.unitPrice(orderDetail.getUnitPrice()).build());
		}
		return OrderEntity.builder().couponCode(couponCode).dateAndTime(dateAndTime).deliveryAddress(addressEntity)
				.paymentStatus(paymentStatus).taxPercentage(taxPercentage).taxAmount(taxAmount).totalAmount(totalAmount)
				.orderStatus(orderStatus).numberOfVessels(numberOfVessels).vesselStatus(vesselStatus)
				.userName(userName).orderDetails(orders).build();
	}

	public Order transformEntity(OrderEntity entity) {
		Log.log("Order", "transformEntity", "Order Received " + entity);

		deliveryAddress = Address.builder().build().transform(entity.getDeliveryAddress());

		List<OrderDetail> orderDetails = new ArrayList<>();
		for (OrderDetailEntity orderDetail : entity.getOrderDetails()) {
			orderDetails.add(OrderDetail.builder().item(Item.builder().build().transformEntity(orderDetail.getItem()))
					.quantity(orderDetail.getQuantity()).unitPrice(orderDetail.getUnitPrice())
					.build());
		}
		return Order.builder().branch(Branch.builder().build().transformEntities(entity.getBranch()))
				.deliveryAddress(deliveryAddress).couponCode(entity.getCouponCode())
				.dateAndTime(entity.getDateAndTime()).orderId(transformId(entity.getOrderId()))
				.paymentStatus(entity.getPaymentStatus()).taxAmount(entity.getTaxAmount())
				.orderStatus(entity.getOrderStatus()).numberOfVessels(entity.getNumberOfVessels())
				.vesselStatus(entity.getVesselStatus())
				.taxPercentage(entity.getTaxPercentage()).totalAmount(entity.getTotalAmount())
				.userName(entity.getUserName()).deliveryAddress(deliveryAddress).orderDetails(orderDetails).build();
	}

	private String transformId(long orderId) {
		return "ORD-" + orderId;
	}
	
	public Long getDatabaseID() {
		return Long.parseLong(orderId.substring(4));
	}

	public List<Order> transformEntities(List<OrderEntity> entities) {
		List<Order> orders = new ArrayList<>(entities.size());
		for (OrderEntity orderEntity : entities) {
			orders.add(transformEntity(orderEntity));
		}
		return orders;
	}
}
