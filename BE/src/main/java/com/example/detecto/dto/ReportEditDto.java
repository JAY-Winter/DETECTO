package com.example.detecto.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ReportEditDto {
    @NotNull
    private int reportId;
    @NotNull
    private int userId;
}
