package com.example.detecto.dto;

import com.example.detecto.entity.enums.ObjectionStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AdminObjectionDto {
    @NotNull
    private int id;

    private String comment;

    private ObjectionStatus status;

    private Integer changeId;
}
