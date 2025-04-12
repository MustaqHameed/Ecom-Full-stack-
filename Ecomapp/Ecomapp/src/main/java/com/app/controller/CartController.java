package com.app.controller;

import com.app.dto.CartItemDTO;
import com.app.model.CartItem;
import com.app.service.CartService;
import com.app.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private JwtService jwtService;

    private String extractEmailFromHeader(String authHeader) {
        String token = authHeader.substring(7); // Remove "Bearer "
        return jwtService.extractUsername(token);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestHeader("Authorization") String authHeader,
                                       @RequestBody CartItemDTO itemDTO) {
        String email = extractEmailFromHeader(authHeader);
        return ResponseEntity.ok(cartService.addToCart(email, itemDTO));
    }

    @GetMapping
    public ResponseEntity<List<CartItem>> getCartItems(@RequestHeader("Authorization") String authHeader) {
        String email = extractEmailFromHeader(authHeader);
        return ResponseEntity.ok(cartService.getCartItems(email));
    }

    @DeleteMapping("/clear")
    public ResponseEntity<String> clearCart(@RequestHeader("Authorization") String authHeader) {
        String email = extractEmailFromHeader(authHeader);
        return ResponseEntity.ok(cartService.clearCart(email));
    }
}
