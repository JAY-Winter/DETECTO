package com.example.detecto.repository;

import com.example.detecto.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;

public interface ReportRepository extends JpaRepository<Report, Integer>{

    @Query("SELECT COUNT(r) FROM Report r WHERE r.time BETWEEN :from AND :to")
    int countTimeInRange(LocalDateTime from, LocalDateTime to);

    @Query("SELECT COUNT(r) FROM Report r WHERE r.user.id = :id AND r.time BETWEEN :from AND :to")
    int countTimeInRangeId(int id, LocalDateTime from, LocalDateTime to);
}
