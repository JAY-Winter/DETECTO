package com.example.detecto.dto;

import com.example.detecto.entity.enums.ReportStatus;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class ReportSearchDto {
    private Integer userId;
    private LocalDate startDate;
    private LocalDate endDate;
    private List<String> equipments;
    private ReportStatus status;
}
