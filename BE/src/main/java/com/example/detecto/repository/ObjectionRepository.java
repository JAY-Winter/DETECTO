package com.example.detecto.repository;

import com.example.detecto.entity.Objection;
import com.example.detecto.entity.Report;
import com.example.detecto.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ObjectionRepository extends JpaRepository<Objection, Integer> {
    int findObjectionByUserAndReport(User u, Report r);
}
