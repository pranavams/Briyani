package com.touchmark.briyani.order;

import java.time.OffsetDateTime;
import java.util.List;

import com.touchmark.briyani.commons.Address;
import com.touchmark.briyani.item.Item;
import com.touchmark.briyani.order.Order.OrderBuilder;

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
public class OrderDetail {
	private Item item;
	private int quantity;
	private float unitPrice;
}
