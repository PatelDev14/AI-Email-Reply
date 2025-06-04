package com.email.writer;

import org.springframework.boot.SpringApplication;//Helps in  launching the application
import org.springframework.boot.autoconfigure.SpringBootApplication;//Sets up auto configuration for the application

@SpringBootApplication // Entry point for the Spring Boot application
// This annotation enables auto-configuration, component scanning, and
// configuration properties support.
public class EmailWriterSbApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmailWriterSbApplication.class, args);
	}

}
