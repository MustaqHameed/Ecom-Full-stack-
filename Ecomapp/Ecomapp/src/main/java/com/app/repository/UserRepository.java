package com.app.repository;

import com.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository // Optional, but good for clarity
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
