package com.example.detecto.api;

import com.example.detecto.data.RespData;
import com.example.detecto.dto.EquipmentEditDto;
import com.example.detecto.dto.EquipmentResponseDto;
import com.example.detecto.service.EquipmentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
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
    public ResponseEntity<?> edit(@RequestPart(value = "file", required = false) MultipartFile file, @RequestBody List<EquipmentEditDto> dtos){
        RespData<Void> response = new RespData<>();

        if(dtos.size() == 0){
            return response.builder();
        }

        if(dtos.size() > 1){
            equipmentService.editList(dtos);
        }else{
            equipmentService.edit(file,dtos.get(0));
        }


        return response.builder();
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<?> delete(@PathVariable String name){
        RespData<Void> response = new RespData<>();

        equipmentService.delete(name);

        return response.builder();
    }

}
