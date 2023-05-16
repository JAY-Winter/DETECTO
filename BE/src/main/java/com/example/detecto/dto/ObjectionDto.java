package com.example.detecto.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ObjectionDto {

    @NotNull
    private int userId;

    @NotNull
    private int reportId;

    @NotNull
    private String comment;
}
