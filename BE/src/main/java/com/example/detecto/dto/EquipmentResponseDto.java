package com.example.detecto.dto;

import com.example.detecto.entity.Equipment;
import lombok.Data;

@Data
public class EquipmentResponseDto {
    private String name;
    private String description;
    private String url;
    private int type;
    private boolean able;
    private boolean training;
    private int epoch;

    public EquipmentResponseDto(Equipment equipment){
        this.name = equipment.getName();
        this.description = equipment.getDescription();
        this.url = equipment.getUrl();
        this.type = equipment.getType();
        this.able = equipment.getAble() == 1 ? true : false;
        this.training = equipment.getTraining() == 1 ? true : false;
    }
}
