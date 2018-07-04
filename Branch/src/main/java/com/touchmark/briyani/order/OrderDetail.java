package com.touchmark.briyani.order;

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
public class OrderDetail {
	private Item item;
	private int quantity;
	private float unitPrice;
}
