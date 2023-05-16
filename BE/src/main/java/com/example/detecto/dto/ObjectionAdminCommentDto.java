package com.example.detecto.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ObjectionAdminCommentDto {
    @NotNull
    private int id;
    @NotNull
    private String comment;
}
