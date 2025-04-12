package com.app.service;

import com.app.dto.UserDTO;
import com.app.model.User;
import com.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;

    // ✅ Register New User
    public String registerUser(UserDTO userDTO) {
        // Check if email already exists
        Optional<User> existingUser = userRepository.findByEmail(userDTO.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("❌ Email already registered!");
        }

        // Create new user and save
        User user = new User();
        user.setFullName(userDTO.getFullName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword())); // Encrypt password

        userRepository.save(user);
        return "✅ User registered successfully!";
    }

    // ✅ Login User and Generate JWT
    public String loginUser(UserDTO userDTO) {
        try {
            // Authenticate user
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userDTO.getEmail(), userDTO.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new RuntimeException("❌ Invalid email or password!");
        }

        // Load user details from UserDetailsService
        UserDetails userDetails = userDetailsService.loadUserByUsername(userDTO.getEmail());

        // Generate JWT token
        return jwtService.generateToken(userDetails);
    }

    // ✅ Get User By Email
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }
}
