package com.touchmark.briyani.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;

@SpringBootApplication
@EnableResourceServer
public class BriyaniApplication {

	public static void main(String[] args) {
		SpringApplication.run(BriyaniApplication.class, args);
	}

}
