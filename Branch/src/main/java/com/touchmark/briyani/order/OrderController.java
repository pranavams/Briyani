package com.touchmark.briyani.order;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.touchmark.briyani.commons.Log;

@RestController
@RequestMapping(path = "/api/v1/order/")
public class OrderController {

	private OrderService service;

	@Autowired
	public OrderController(OrderService service) {
		this.service = service;
	}

	@GetMapping
	@RequestMapping("/listAll")
	public ResponseEntity<OrderResponse> getAll() {
		return ResponseEntity.ok(OrderResponse.builder().order(this.service.getAll()).build());
	}

	@GetMapping
	@RequestMapping("/listForCustomer/{id}")
	public ResponseEntity<OrderResponse> getOrdersForCustomer(@PathVariable("id") String id) {
		return ResponseEntity.ok(OrderResponse.builder().order(this.service.getOrdersForCustomer(id)).build());
	}

	@GetMapping
	@RequestMapping("/listForBranch/{id}")
	public ResponseEntity<OrderResponse> getOrdersForBranch(@PathVariable("id") String id) {
		return ResponseEntity.ok(OrderResponse.builder().order(this.service.getOrdersForBranch(id)).build());
	}

	@PostMapping
	@RequestMapping(path = "/createOrder", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> createOrder(@RequestBody CreateOrder object) {
		try {
			Log.log("OrderController", "createOrder", "Object Received To Save " + object);
			this.service.createOrder(object);
			return ResponseEntity.ok("");
		} catch (Exception ex) {
			Log.error("OrderController", "createOrder", "Object Creation Failed ", ex);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
		}
	}

	@GetMapping
	@RequestMapping("/listRecent")
	public ResponseEntity<OrderResponse> getRecent() {
		return ResponseEntity.ok(OrderResponse.builder().order(this.service.getRecent()).build());
	}

	@GetMapping
	@RequestMapping("/listTodayOrders")
	public ResponseEntity<OrderResponse> getTodayOrders() {
		return ResponseEntity.ok(OrderResponse.builder().order(this.service.getTodayOrders()).build());
	}

	@GetMapping
	@RequestMapping("/listOrders/{status}")
	public ResponseEntity<OrderResponse> getOrders(@PathVariable("status") String status) {
		return ResponseEntity.ok(OrderResponse.builder().order(this.service.getOrders(status.toUpperCase())).build());
	}

	@GetMapping
	@RequestMapping("/listOrdersOngoing/{status}")
	public ResponseEntity<OrderResponse> getOrdersOngoing(@PathVariable("status") String status) {
		return ResponseEntity
				.ok(OrderResponse.builder().order(this.service.getOrdersOnGoing(status.toUpperCase())).build());
	}

	@GetMapping
	@RequestMapping("/listOrdersByPaymentStatus/{status}")
	public ResponseEntity<OrderResponse> getOrdersByPaymentStatus(@PathVariable("status") String status) {
		return ResponseEntity
				.ok(OrderResponse.builder().order(this.service.getOrdersByPaymentStatus(status.toUpperCase())).build());
	}

	@GetMapping
	@RequestMapping("/get/{id}")
	public ResponseEntity<OrderResponse> get(@PathVariable("id") String id) {
		Log.log("OrderController", "get", "Parameter Received " + id);
		return ResponseEntity.ok(OrderResponse.builder().order(Arrays.asList(this.service.get(id))).build());
	}

	@GetMapping
	@RequestMapping("/updateOrderStatus/{id}/{orderStatus}")
	public ResponseEntity<String> updateOrderStatus(@PathVariable("id") String id,
			@PathVariable("orderStatus") String orderStatus) {
		try {
			Log.log("OrderController", "updateOrderStatus", "Object Received To Update " + id + ", " + orderStatus);
			this.service.updateOrderStatus(id, orderStatus);
			return ResponseEntity.ok("");
		} catch (Exception ex) {
			Log.error("OrderController", "updateOrderStatus", "Order Status Update Failed", ex);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
		}
	}

	@GetMapping
	@RequestMapping("/updatePaymentStatus/{id}/{paymentStatus}")
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
	public ResponseEntity<OrderResponse> getOrdersByVesselStatus(@PathVariable("status") String status) {
		return ResponseEntity
				.ok(OrderResponse.builder().order(this.service.getOrdersByVesselStatus(status.toUpperCase())).build());
	}
}
