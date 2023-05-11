package com.example.detecto.service;

import com.example.detecto.dto.EquipmentEditDto;
import com.example.detecto.dto.EquipmentResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface EquipmentService {

    boolean checkName(String name);

    List<EquipmentResponseDto> read();

    void edit(MultipartFile file, EquipmentEditDto equipmentEditDto);

    void delete(String name);
}
