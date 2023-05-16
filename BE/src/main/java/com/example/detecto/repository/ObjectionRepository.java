package com.example.detecto.repository;

import com.example.detecto.entity.Objection;
import com.example.detecto.entity.Report;
import com.example.detecto.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ObjectionRepository extends JpaRepository<Objection, Integer> {

    @Query("SELECT count(*) FROM Objection o WHERE o.user = :u AND o.report = :r")
    int findObjectionByUserAndReport(User u, Report r);
}
