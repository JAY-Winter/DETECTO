package com.example.detecto.service;

import com.example.detecto.dto.*;

import java.util.List;

public interface ReportService {
    List<ReportSearchResponseDto> search(ReportSearchDto reportSearchDto);

    void coord(ReportCoordDto reportCoordDto);

    void objection(ObjectionDto objectionDto);

    ReportCountResponseDto count(int id);
}
