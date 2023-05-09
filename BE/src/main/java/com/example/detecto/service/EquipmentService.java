package com.example.detecto.service;

import com.example.detecto.dto.EquipmentEditDto;
import com.example.detecto.dto.EquipmentResponseDto;

import java.util.List;

public interface EquipmentService {

    boolean checkName(String name);

    List<EquipmentResponseDto> read();

    void edit(EquipmentEditDto equipmentEditDto);

    void delete(String name);
}
