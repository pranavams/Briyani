package com.touchmark.briyani.order;

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
public class UpdateOrder {
	private String id;
	private String orderStatus;
	private int numberOfVessels;
	private String vesselDescription;
}
