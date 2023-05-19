package com.example.detecto.dto;

import com.example.detecto.entity.enums.UserType;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class ReportSearchDto {
    private Integer id;
    private LocalDate startDate;
    private LocalDate endDate;
    private List<String> equipments;
    private UserType type;
}
