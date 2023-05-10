package com.example.detecto.service;

import com.example.detecto.dto.ReportSearchDto;
import com.example.detecto.dto.ReportSearchResponseDto;

import java.util.List;

public interface ReportService {
    List<ReportSearchResponseDto> search(ReportSearchDto reportSearchDto);
}
