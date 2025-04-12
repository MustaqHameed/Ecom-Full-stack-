package com.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class EcomappApplication {

	public static void main(String[] args) {
		SpringApplication.run(EcomappApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
	    return new WebMvcConfigurer() {
	        @Override
	        public void addCorsMappings(CorsRegistry registry) {
	            registry.addMapping("/**")
	                    .allowedOrigins("http://localhost:5173") // Your React frontend
	                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
	                    .allowedHeaders("*")
	                    .exposedHeaders("Authorization")
	                    .allowCredentials(true); // Required if using credentials like cookies or Authorization header
	        }
	    };
	}
}
