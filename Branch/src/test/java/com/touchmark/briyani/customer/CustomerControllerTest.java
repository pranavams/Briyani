package com.touchmark.briyani.customer;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.touchmark.briyani.JSONConvertor;
import com.touchmark.briyani.app.BriyaniApplication;

@RunWith(SpringRunner.class)
@WebMvcTest(value = CustomerController.class, secure = false)
@ContextConfiguration(classes = { BriyaniApplication.class })
public class CustomerControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private CustomerService service;

	@Before
	public void setup() {
		mockMvc = MockMvcBuilders.standaloneSetup(new CustomerController(service)).build();
	}

	@Test
	public void retrieveAllCustomer() throws Exception {
		List<Customer> mockCustomeres = new ArrayList<>();
		Mockito.when(service.getAll()).thenReturn(mockCustomeres);

		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/v1/customer/listAll")
				.accept(MediaType.APPLICATION_JSON_VALUE);
		MvcResult result = mockMvc.perform(requestBuilder).andExpect(status().isOk()).andReturn();

		String expected = JSONConvertor.toJSONString(CustomerResponse.builder().customer(mockCustomeres).build());

		JSONAssert.assertEquals(expected, result.getResponse().getContentAsString(), false);
	}

}
