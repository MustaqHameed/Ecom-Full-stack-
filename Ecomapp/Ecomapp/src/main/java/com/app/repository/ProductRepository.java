package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);
}
