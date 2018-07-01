package com.touchmark.briyani.order;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.touchmark.briyani.item.ItemEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString

@Entity
@Table(name = "orderDetail")
public class OrderDetailEntity implements Serializable{

	@GeneratedValue(strategy = GenerationType.AUTO)
	@Id
	@Column(name = "orderDetailsId")
	private long orderDetailsId;

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "itemId")
	private ItemEntity item;
	
	@Column(name = "quantity")
	private int quantity;

	@Column(name = "unitPrice")
	private float unitPrice;
	
	@ManyToOne
	@JoinColumn(name = "orderId")
	private OrderEntity order;
}
