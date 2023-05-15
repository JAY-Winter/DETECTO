package com.example.detecto.api;


import com.example.detecto.data.RespData;
import com.example.detecto.dto.*;
import com.example.detecto.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.common.serialization.VoidDeserializer;
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

    @GetMapping("/count/{id}")
    public ResponseEntity<?> count(@PathVariable int id){
        RespData<ReportCountResponseDto> response = new RespData<>();

        ReportCountResponseDto data = reportService.count(id);
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
