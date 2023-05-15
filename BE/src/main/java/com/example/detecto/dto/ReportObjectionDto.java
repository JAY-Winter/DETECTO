package com.example.detecto.dto;

import com.example.detecto.entity.enums.ReportStatus;
import lombok.Data;

@Data
public class ReportObjectionDto {
    private int id;
    private ReportStatus status;
}
