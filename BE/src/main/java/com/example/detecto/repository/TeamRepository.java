package com.example.detecto.repository;

import com.example.detecto.entity.Team;
import com.example.detecto.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Integer> {
}
