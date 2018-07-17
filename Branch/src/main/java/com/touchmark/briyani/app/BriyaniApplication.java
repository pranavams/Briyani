package com.touchmark.briyani.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
//@EnableOAuth2Sso
// @EnableResourceServer
public class BriyaniApplication {

	public static void main(String[] args) {
		SpringApplication.run(BriyaniApplication.class, args);
	}

	/*
	 * @JsonAutoDetect(fieldVisibility = Visibility.ANY) static class MyBean {
	 * String attr = "demo"; }
	 * 
	 * @ControllerAdvice static class JsonpAdvice extends
	 * AbstractJsonpResponseBodyAdvice { public JsonpAdvice() { super("callback"); }
	 * }
	 */

	@SuppressWarnings("deprecation")
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurerAdapter() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/**")
                .allowedOrigins("https://mobile-branch-rider.cfapps.io", "https://mobile-branch-manager-auth.cfapps.io", "https://mobile-branch-manager.cfapps.io", "https://briyani-web-ui-auth.cfapps.io", "http://localhost:36363", "http://localhost", "http://localhost:8100")
				.allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH", "OPTONS");
			}
		};
	}
}
