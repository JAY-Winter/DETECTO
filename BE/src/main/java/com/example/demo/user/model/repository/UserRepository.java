package com.example.demo.user.model.repository;

import com.example.demo.user.model.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByNumber(String number);
}
