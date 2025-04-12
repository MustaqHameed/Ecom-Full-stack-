package com.app.config;

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


import com.app.model.User;
import com.app.repository.UserRepository;


@Configuration
public class ApplicationConfiguration {

    private static final Logger logger = LoggerFactory.getLogger(ApplicationConfiguration.class);
    private final UserRepository studentRepository;
   

    public ApplicationConfiguration(UserRepository studentRepository) {
        this.studentRepository = studentRepository;
       
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            // First try to find a student by email
        	User student = studentRepository.findByEmail(username).orElse(null);
            if (student != null) {
                // ✅ Log user retrieval
                System.out.println("🔍 Loading student: " + student.getEmail());
                return org.springframework.security.core.userdetails.User
                        .withUsername(student.getEmail())
                        .password(student.getPassword()) // Ensure encoded password is used
                        .authorities(new ArrayList<>()) // No roles for now
                        .build();
            }

           
            throw new UsernameNotFoundException("User not found with email: " + username);
        };
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }
}
