package com.example.detecto.repository;

import com.example.detecto.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByIdAndPassword(String id, String password);
}
