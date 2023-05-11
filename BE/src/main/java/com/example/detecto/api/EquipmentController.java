package com.example.detecto.api;

import com.example.detecto.data.RespData;
import com.example.detecto.dto.EquipmentEditDto;
import com.example.detecto.dto.EquipmentResponseDto;
import com.example.detecto.service.EquipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/equipment")
public class EquipmentController {

    private final EquipmentService equipmentService;

    @GetMapping("/{name}")
    public ResponseEntity<?> checkName(@PathVariable String name){
        RespData<Boolean> response = new RespData<>();

        if(equipmentService.checkName(name)) {
            response.setData(true);
            return response.builder();
        }
        response.setData(false);

        return response.builder();
    }
    // 장비명 중복 체크
    @GetMapping
    public ResponseEntity<?> read(){
        RespData<List> response = new RespData<>();

        List<EquipmentResponseDto> data = equipmentService.read();
        response.setData(data);

        return response.builder();
    }

    @PutMapping
    public ResponseEntity<?> edit(@RequestPart("file") MultipartFile file, @RequestBody EquipmentEditDto dto){
        RespData<Void> response = new RespData<>();

        equipmentService.edit(file,dto);

        return response.builder();
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<?> delete(@PathVariable String name){
        RespData<Void> response = new RespData<>();

        equipmentService.delete(name);

        return response.builder();
    }

}
