package com.touchmark.briyani.menu;

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
import com.touchmark.briyani.item.Menu;
import com.touchmark.briyani.item.MenuController;
import com.touchmark.briyani.item.MenuResponse;
import com.touchmark.briyani.item.MenuService;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = { BriyaniApplication.class })
@WebMvcTest(value = MenuController.class, secure = false)
public class MenuControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private MenuService service;

	@Before
	public void setup() {
		mockMvc = MockMvcBuilders.standaloneSetup(new MenuController(service)).build();
	}

	@Test
	public void retrieveAllMenu() throws Exception {
		List<Menu> mockMenues = new ArrayList<>();
		mockMenues.add(Menu.builder()
				.id("CHBI1")
				.name("briyani")
				.build());
		Mockito.when(service.getAll()).thenReturn(mockMenues);

		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/v1/menu/listAll")
				.accept(MediaType.APPLICATION_JSON_VALUE);
		MvcResult result = mockMvc.perform(requestBuilder).andExpect(status().isOk())
				.andReturn();

		String expected = JSONConvertor.toJSONString(MenuResponse.builder().menu(mockMenues).build());

		JSONAssert.assertEquals(expected, result.getResponse().getContentAsString(), false);
	}

}
