package com.app.controller;

import com.app.dto.UserDTO;
import com.app.model.User;
import com.app.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    // ✅ Register User
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
        try {
            log.info("🔹 Registering user: {}", userDTO.getEmail());
            String message = userService.registerUser(userDTO);
            return ResponseEntity.ok().body(Collections.singletonMap("message", message));
        } catch (RuntimeException e) {
            log.error("❌ Error registering user: {}", userDTO.getEmail(), e);
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    // ✅ Login User and Return JWT Token
    /*@PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDTO userDTO) {
        try {
            log.info("🔹 Logging in user: {}", userDTO.getEmail());
            String token = userService.loginUser(userDTO);
            log.info("✅ User logged in successfully: {}", userDTO.getEmail());
            return ResponseEntity.ok().body(Collections.singletonMap("token", token));
        } catch (RuntimeException e) {
            log.warn("⚠️ Login failed for user: {}", userDTO.getEmail());
            log.error("❌ Error during login: {}", userDTO.getEmail(), e);
            return ResponseEntity.status(401).body(Collections.singletonMap("error", e.getMessage()));
        }
    }*/
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDTO userDTO) {
        try {
            log.info("🔹 Logging in user: {}", userDTO.getEmail());
            String token = userService.loginUser(userDTO);
            User user = userService.getUserByEmail(userDTO.getEmail()); // 🔑 Get user to extract ID
            log.info("✅ User logged in successfully: {}", userDTO.getEmail());

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("userId", user.getId()); // ✅ Include userId in response

            return ResponseEntity.ok().body(response);
        } catch (RuntimeException e) {
            log.warn("⚠️ Login failed for user: {}", userDTO.getEmail());
            log.error("❌ Error during login: {}", userDTO.getEmail(), e);
            return ResponseEntity.status(401).body(Collections.singletonMap("error", e.getMessage()));
        }
    }

}