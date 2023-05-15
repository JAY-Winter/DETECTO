package com.example.detecto.repository;

import com.example.detecto.entity.EMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface MessageRepository extends JpaRepository<EMessage, Integer> {

    @Query("SELECT e FROM EMessage e WHERE e.user.id = :id")
    List<EMessage> findAllByUserId(int id);
}
