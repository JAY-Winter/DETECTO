package com.example.detecto.repository;

import com.example.detecto.entity.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EquipmentRepository extends JpaRepository<Equipment, String> {

    @Query("SELECT e FROM Equipment e WHERE e.type != :type")
    List<Equipment> findByType(int type);

    @Query("SELECT COUNT(*) FROM Equipment e WHERE e.type = :type AND e.able = 1")
    int findByTypeCount(int type);
}
