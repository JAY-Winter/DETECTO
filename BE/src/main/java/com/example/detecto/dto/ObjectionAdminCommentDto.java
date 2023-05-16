package com.example.detecto.dto;

import com.example.detecto.entity.enums.ObjectionStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ObjectionAdminCommentDto {
    @NotNull
    private int id;
    @NotNull
    private String comment;

    private ObjectionStatus status;
}
