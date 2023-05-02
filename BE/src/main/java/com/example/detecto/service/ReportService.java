package com.example.detecto.service;

import com.example.detecto.data.RespData;
import com.example.detecto.dto.ReportSearchDto;

public interface ReportService {
    RespData search(ReportSearchDto reportSearchDto);
}
