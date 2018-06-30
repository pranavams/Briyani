package com.touchmark.briyani.branch.app;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@ComponentScan(basePackages = {"com.touchmark.briyani.branch"})
@EnableJpaRepositories(basePackages = {"com.touchmark.briyani.branch.entities"})
@EntityScan(basePackages = {"com.touchmark.briyani.branch.entities"})
@EnableTransactionManagement
@EnableAutoConfiguration
public class BranchConfiguration {

}
