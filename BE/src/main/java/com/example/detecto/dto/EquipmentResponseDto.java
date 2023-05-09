package com.example.detecto.dto;

import com.example.detecto.entity.Equipment;
import lombok.Data;

@Data
public class EquipmentResponseDto {
    private String name;
    private String description;
    private String url;
    private boolean able;
    private boolean training;

    public EquipmentResponseDto(Equipment equipment){
        this.name = equipment.getName();
        this.description = equipment.getDescription();
        this.url = equipment.getUrl();
        this.able = equipment.getAble() == 1 ? true : false;
        this.training = equipment.getTraining() == 1 ? true : false;
    }
}
