package com.touchmark.briyani.item;

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
@ContextConfiguration(classes = { BriyaniApplication.class })
@WebMvcTest(value = ItemController.class, secure = false)
public class ItemControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private ItemService service;

	@Before
	public void setup() {
		mockMvc = MockMvcBuilders.standaloneSetup(new ItemController(service)).build();
	}

	@Test
	public void retrieveAllItem() throws Exception {
		List<Item> mockItemes = new ArrayList<>();
		mockItemes.add(Item.builder()
				.description("desc")
				.id("CHBIR1")
				.menuId("CHBI1")
				.menuName("Chicken")
				.name("briyani")
				.price(100)
				.build());
		Mockito.when(service.getAll()).thenReturn(mockItemes);

		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/v1/item/listAll")
				.accept(MediaType.APPLICATION_JSON_VALUE);
		MvcResult result = mockMvc.perform(requestBuilder).andExpect(status().isOk())
				.andReturn();

		String expected = JSONConvertor.toJSONString(ItemResponse.builder().items(mockItemes).build());

		JSONAssert.assertEquals(expected, result.getResponse().getContentAsString(), false);
	}

}
