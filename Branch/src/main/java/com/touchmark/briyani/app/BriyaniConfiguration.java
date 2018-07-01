package com.touchmark.briyani.app;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@ComponentScan(basePackages = { "com.touchmark.briyani.branch", "com.touchmark.briyani.user",
		"com.touchmark.briyani.rider" })
@EnableJpaRepositories(basePackages = { "com.touchmark.briyani.branch", "com.touchmark.briyani.user",
		"com.touchmark.briyani.rider" })
@EntityScan(basePackages = { "com.touchmark.briyani.branch", "com.touchmark.briyani.user",
		"com.touchmark.briyani.rider" })
@EnableTransactionManagement
@EnableAutoConfiguration
public class BriyaniConfiguration {

}
