package com.example.detecto.service;

import com.example.detecto.dto.ObjectionDto;
import com.example.detecto.dto.ReportCoordDto;
import com.example.detecto.dto.ReportSearchDto;
import com.example.detecto.dto.ReportSearchResponseDto;

import java.util.List;

public interface ReportService {
    List<ReportSearchResponseDto> search(ReportSearchDto reportSearchDto);

    void coord(ReportCoordDto reportCoordDto);

    void objection(ObjectionDto objectionDto);
}
