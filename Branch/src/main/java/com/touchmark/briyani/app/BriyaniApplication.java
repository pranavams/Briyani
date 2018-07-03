package com.touchmark.briyani.app;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.AbstractJsonpResponseBodyAdvice;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;

@SpringBootApplication
//@EnableResourceServer
public class BriyaniApplication {

	public static void main(String[] args) {
		SpringApplication.run(BriyaniApplication.class, args);
	}

	@JsonAutoDetect(fieldVisibility = Visibility.ANY)
    static class MyBean {
        String attr = "demo";
    }

    @ControllerAdvice
    static class JsonpAdvice extends AbstractJsonpResponseBodyAdvice {
        public JsonpAdvice() {
            super("callback");
        }
    }
}
