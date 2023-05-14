package com.example.detecto.api;


import com.example.detecto.data.RespData;
import com.example.detecto.dto.ObjectionDto;
import com.example.detecto.dto.ReportCoordDto;
import com.example.detecto.dto.ReportSearchDto;
import com.example.detecto.dto.ReportSearchResponseDto;
import com.example.detecto.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/report")
public class ReportController {

    private final ReportService reportService;

    @GetMapping
    public ResponseEntity<?> search(@ModelAttribute ReportSearchDto reportSearchDto){
        RespData<List> response = new RespData<>();

        List<ReportSearchResponseDto> data = reportService.search(reportSearchDto);
        response.setData(data);

        return response.builder();
    }

    @PostMapping("/coord")
    public ResponseEntity<?> coord(@RequestBody ReportCoordDto reportCoordDto){
        RespData<List> response = new RespData<>();

        reportService.coord(reportCoordDto);

        return  response.builder();
    }

    @PutMapping("/objection")
    public ResponseEntity<?> objection(@RequestBody ObjectionDto objectionDto){
        RespData<List> response = new RespData<>();

        reportService.objection(objectionDto);

        return  response.builder();
    }
}
