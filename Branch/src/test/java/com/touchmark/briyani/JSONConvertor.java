package com.touchmark.briyani;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JSONConvertor {

	public static <T> String toJSONString(T t) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			return mapper.writeValueAsString(t);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return "{}";
		}

	}

}
