package com.touchmark.briyani.order;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.touchmark.briyani.commons.Log;

@RestController
@RequestMapping(path = "/api/v1/order/")
@PreAuthorize("hasAuthority('BRANCH_USER')")
public class OrderController {

	private OrderService service;

	@Autowired
	public OrderController(OrderService service) {
		this.service = service;
	}

	@GetMapping
	@RequestMapping("/listAll")
	@PreAuthorize("hasAuthority('BRANCH_USER')")
	public ResponseEntity<OrderResponse> getAll() {
		return ResponseEntity.ok(OrderResponse.builder().order(this.service.getAll()).build());
	}

	@GetMapping
	@RequestMapping("/listForCustomer/{id}")
	@PreAuthorize("hasAuthority('BRANCH_USER')")
	public ResponseEntity<OrderResponse> getOrdersForCustomer(@PathVariable("id") String id) {
		return ResponseEntity.ok(OrderResponse.builder().order(this.service.getOrdersForCustomer(id)).build());
	}

	@GetMapping
	@RequestMapping("/listForBranch/{id}")
	@PreAuthorize("hasAuthority('BRANCH_USER')")
	public ResponseEntity<OrderResponse> getOrdersForBranch(@PathVariable("id") String id) {
		return ResponseEntity.ok(OrderResponse.builder().order(this.service.getOrdersForBranch(id)).build());
	}

	@PostMapping
	@RequestMapping(path = "/createOrder", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("hasAuthority('BRANCH_USER')")
	public ResponseEntity<Order> createOrder(@RequestBody CreateOrder object) {
		try {
			Log.log("OrderController", "createOrder", "Object Received To Save " + object);
			OrderEntity createdOrder = this.service.createOrder(object);
			return ResponseEntity.ok(Order.builder().build().transformEntity(createdOrder));
		} catch (Exception ex) {
			Log.error("OrderController", "createOrder", "Object Creation Failed ", ex);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Order.builder().build());
		}
	}

	@GetMapping
	@RequestMapping("/listRecent")
	@PreAuthorize("hasAuthority('BRANCH_USER')")
	public ResponseEntity<OrderResponse> getRecent() {
		return ResponseEntity.ok(OrderResponse.builder().order(this.service.getRecent()).build());
	}

	@GetMapping
	@RequestMapping("/listTodayOrders")
	@PreAuthorize("hasAuthority('BRANCH_USER')")
	public ResponseEntity<OrderResponse> getTodayOrders() {
		return ResponseEntity.ok(OrderResponse.builder().order(this.service.getTodayOrders()).build());
	}

	@GetMapping
	@RequestMapping("/listOrders/{status}")
	@PreAuthorize("hasAuthority('BRANCH_USER')")
	public ResponseEntity<OrderResponse> getOrders(@PathVariable("status") String status) {
		return ResponseEntity.ok(OrderResponse.builder().order(this.service.getOrders(status.toUpperCase())).build());
	}

	@GetMapping
	@RequestMapping("/listOrdersOngoing/{status}")
	@PreAuthorize("hasAuthority('BRANCH_USER')")
	public ResponseEntity<OrderResponse> getOrdersOngoing(@PathVariable("status") String status) {
		return ResponseEntity
				.ok(OrderResponse.builder().order(this.service.getOrdersOnGoing(status.toUpperCase())).build());
	}

	@GetMapping
	@RequestMapping("/listOrdersByPaymentStatus/{status}")
	@PreAuthorize("hasAuthority('BRANCH_USER')")
	public ResponseEntity<OrderResponse> getOrdersByPaymentStatus(@PathVariable("status") String status) {
		return ResponseEntity
				.ok(OrderResponse.builder().order(this.service.getOrdersByPaymentStatus(status.toUpperCase())).build());
	}

	@GetMapping
	@RequestMapping("/get/{id}")
	@PreAuthorize("hasAuthority('BRANCH_USER')")
	public ResponseEntity<OrderResponse> get(@PathVariable("id") String id) {
		Log.log("OrderController", "get", "Parameter Received " + id);
		return ResponseEntity.ok(OrderResponse.builder().order(Arrays.asList(this.service.get(id))).build());
	}

	@PostMapping
	@RequestMapping("/updateOrderStatus/")
	@PreAuthorize("hasAuthority('BRANCH_USER')")
	public ResponseEntity<OrderEntity> updateOrderStatus(@RequestBody UpdateOrder order){
		try {
			Log.log("OrderController", "updateOrderStatus", "Object Received To Update " + order);
			return ResponseEntity.ok(this.service.updateOrderStatus(order));
		} catch (Exception ex) {
			Log.error("OrderController", "updateOrderStatus", "Order Status Update Failed", ex);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(OrderEntity.builder().build());
		}
	}

	@GetMapping
	@RequestMapping("/updatePaymentStatus/{id}/{paymentStatus}")
	@PreAuthorize("hasAuthority('BRANCH_USER')")
	public ResponseEntity<String> updatePaymentStatus(@PathVariable("id") String id,
			@PathVariable("paymentStatus") String paymentStatus) {
		try {
			Log.log("OrderController", "updatePaymentStatus", "Object Received To Update " + id + ", " + paymentStatus);
			this.service.updatePaymentStatus(id, paymentStatus);
			return ResponseEntity.ok("");
		} catch (Exception ex) {
			Log.error("OrderController", "updatePaymentStatus", "Order Payment Status Update Failed", ex);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
		}
	}

	@GetMapping
	@RequestMapping("/updateVesselStatus/{id}/{vesselStatus}")
	@PreAuthorize("hasAuthority('BRANCH_USER')")
	public ResponseEntity<String> updateVesselStatus(@PathVariable("id") String id,
			@PathVariable("vesselStatus") String vesselStatus) {
		try {
			Log.log("OrderController", "updateVesselStatus",
					"Object Received To Update Vessel Status " + id + ", " + vesselStatus);
			this.service.updateVesselStatus(id, vesselStatus);
			return ResponseEntity.ok("");
		} catch (Exception ex) {
			Log.error("OrderController", "updateVesselStatus", "Order Vessel Status Update Failed", ex);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
		}
	}

	@GetMapping
	@RequestMapping("/listOrdersByVesselStatus/{status}")
	@PreAuthorize("hasAuthority('BRANCH_USER')")
	public ResponseEntity<OrderResponse> getOrdersByVesselStatus(@PathVariable("status") String status) {
		return ResponseEntity
				.ok(OrderResponse.builder().order(this.service.getOrdersByVesselStatus(status.toUpperCase())).build());
	}
}
