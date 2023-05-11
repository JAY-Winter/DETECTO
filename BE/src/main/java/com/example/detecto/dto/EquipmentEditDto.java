package com.example.detecto.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class EquipmentEditDto {
    private String name;
    private String description;
    private int able;
}

