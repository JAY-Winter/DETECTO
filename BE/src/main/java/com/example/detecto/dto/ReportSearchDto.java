package com.example.detecto.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class ReportSearchDto {
    private LocalDate startDate;
    private LocalDate endDate;
    private List<String> equipments;
}
