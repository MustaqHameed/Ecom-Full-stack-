package com.app.service;

import com.app.dto.CartItemDTO;
import com.app.model.Cart;
import com.app.model.CartItem;
import com.app.model.User;
import com.app.repository.CartItemRepository;
import com.app.repository.CartRepository;
import com.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserRepository userRepository;

    // Add item to cart
    public String addToCart(String userEmail, CartItemDTO itemDTO) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUser(user).orElseGet(() -> new Cart(user));
        if (cart.getItems() == null) cart.setItems(new ArrayList<>());

        boolean updated = false;
        for (CartItem item : cart.getItems()) {
            if (item.getProductId().equals(itemDTO.getProductId())) {
                item.setQuantity(item.getQuantity() + itemDTO.getQuantity());
                updated = true;
                break;
            }
        }

        if (!updated) {
            cart.getItems().add(new CartItem(cart, itemDTO.getProductId(), itemDTO.getQuantity()));
        }

        cartRepository.save(cart);
        return "Item added to cart!";
    }

    // Get all cart items
    public List<CartItem> getCartItems(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Cart cart = cartRepository.findByUser(user).orElse(null);

        return cart != null ? cart.getItems() : Collections.emptyList();
    }

    // Clear cart
    public String clearCart(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUser(user).orElse(null);
        if (cart != null) {
            cart.getItems().clear();
            cartRepository.save(cart);
        }

        return "Cart cleared successfully.";
    }
}
