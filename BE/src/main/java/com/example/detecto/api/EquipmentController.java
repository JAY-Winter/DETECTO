package com.example.detecto.api;

import com.example.detecto.dto.EquipmentEditDto;
import com.example.detecto.dto.EquipmentResponseDto;
import com.example.detecto.exception.DoesNotExistData;
import com.example.detecto.exception.InvalidData;
import com.example.detecto.service.EquipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/equipment")
public class EquipmentController {

    private final EquipmentService equipmentService;

    @GetMapping("/{name}")
    public ResponseEntity<?> checkName(@PathVariable String name){
        if(equipmentService.checkName(name)) return new ResponseEntity<String>("available", HttpStatus.OK);

        return new ResponseEntity<String>("unavailable", HttpStatus.OK);
    }
    // 장비명 중복 체크
    @GetMapping
    public ResponseEntity<?> read(){
        List<EquipmentResponseDto> data = equipmentService.read();

        return new ResponseEntity<List<EquipmentResponseDto>>(data, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<?> edit(@ModelAttribute EquipmentEditDto equipmentEditDto){
        equipmentService.edit(equipmentEditDto);
        return new ResponseEntity<String>("success", HttpStatus.OK);
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<?> delete(@PathVariable String name){
        equipmentService.delete(name);
        return new ResponseEntity<String>("success", HttpStatus.OK);
    }

}
