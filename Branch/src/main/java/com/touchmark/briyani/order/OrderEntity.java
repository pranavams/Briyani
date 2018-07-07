package com.touchmark.briyani.order;

import java.io.Serializable;
import java.time.OffsetDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.touchmark.briyani.branch.BranchEntity;
import com.touchmark.briyani.commons.AddressEntity;
import com.touchmark.briyani.customer.CustomerEntity;

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

	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
	
	@Column(name = "orderStatus")
	private String orderStatus;


	@OneToOne(fetch=FetchType.LAZY, cascade= CascadeType.ALL)
	@JoinColumn(name = "branchId")
	private BranchEntity branch;
	
	@OneToOne(fetch=FetchType.LAZY, cascade= CascadeType.ALL)
	@JoinColumn(name = "customerId")
	private CustomerEntity customer;

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "addressId")
	private AddressEntity deliveryAddress;
	
	@OneToMany(cascade = CascadeType.ALL)
	//@JoinTable(name = "orderDetail", joinColumns = @JoinColumn(name = "orderId"), inverseJoinColumns = @JoinColumn(name = "orderDetailsId"))
	private List<OrderDetailEntity> orderDetails;
	
	@Column(name = "lastUpdatedDate")
	private OffsetDateTime lastUpdatedDate;
}
