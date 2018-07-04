package com.touchmark.briyani.order;

import java.util.List;

import com.touchmark.briyani.commons.Address;

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
public class CreateOrder {
	private String couponCode;
	private String userName;
	private String branchID;
	private String customerID;
	private Address deliveryAddress;
	private List<OrderDetail> orderDetails;

}
