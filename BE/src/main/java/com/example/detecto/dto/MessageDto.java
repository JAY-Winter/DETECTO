package com.example.detecto.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MessageDto {

    private int id;

    @NotNull
    private String title;

    @NotNull
    private String message;
}
