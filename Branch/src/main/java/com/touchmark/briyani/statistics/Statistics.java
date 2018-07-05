package com.touchmark.briyani.statistics;

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
public class Statistics {

	private float todayOrders;
	private float todaySales;
	private float todayPaid;
	private float todayDue;
	private int todayNumberOfOrders;
	private int todayNumberOfPurchaseRequest;

	private float overallOrders;
	private float overallSales;
	private float overallPaid;
	private float overallDue;
	private int overallNumberOfOrders;
	private int overallNumberOfPurchaseRequest;



}
