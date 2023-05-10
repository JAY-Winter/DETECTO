package com.example.detecto.repository;

import com.example.detecto.entity.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EquipmentRepository extends JpaRepository<Equipment, String> {

    List<Equipment> findByType(int type);
}
