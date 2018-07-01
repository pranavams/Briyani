package com.touchmark.briyani.order;

import java.io.Serializable;
import java.time.OffsetDateTime;
import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.touchmark.briyani.commons.AddressEntity;

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
@Table(name = "orderInfo")
public class OrderEntity implements Serializable {

	@GeneratedValue(strategy = GenerationType.AUTO)
	@Id
	@Column(name = "orderId")
	private long orderId;
	
	@Column(name = "dateAndTime")
	private OffsetDateTime dateAndTime;
	
	@Column(name = "couponCode")
	private String couponCode;

	@Column(name = "taxPercentage")
	private float taxPercentage;
	
	@Column(name = "taxAmount")
	private float taxAmount;

	@Column(name = "totalAmount")
	private float totalAmount;
	
	@Column(name = "userName")
	private String userName;

	@Column(name = "paymentStatus")
	private String paymentStatus;

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "addressId")
	private AddressEntity deliveryAddress;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "order")
	//@JoinTable(name = "orderDetail", joinColumns = @JoinColumn(name = "orderId"), inverseJoinColumns = @JoinColumn(name = "orderDetailsId"))
	private Collection<OrderDetailEntity> orderDetails;
	
}
