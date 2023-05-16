package com.example.detecto.service;

import com.example.detecto.dto.*;

import java.util.List;

public interface ReportService {
    List<ReportSearchResponseDto> search(ReportSearchDto reportSearchDto);

    void coord(ReportCoordDto reportCoordDto);

    ReportCountResponseDto count(int id);

    void edit(ReportEditDto reportEditDto);
}
