package com.example.detecto.api;

import com.example.detecto.data.RespData;
import com.example.detecto.dto.MessageResponseDto;
import com.example.detecto.dto.ObjectionAdminCommentDto;
import com.example.detecto.dto.ObjectionDto;
import com.example.detecto.dto.ObjectionResponseDto;
import com.example.detecto.service.ObjectionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/objection")
public class ObjectionController {

    private final ObjectionService objectionService;

    @GetMapping
    private ResponseEntity<?> getObjectionList(){
        RespData<List<ObjectionResponseDto>> response = new RespData<>();

        List<ObjectionResponseDto> data = objectionService.getObjectionList().stream().map(o -> new ObjectionResponseDto(o)).collect(Collectors.toList());
        response.setData(data);

        return response.builder();
    }

    @GetMapping("/{id}")
    private ResponseEntity<?> getObjectionList(@PathVariable int id){
        RespData<List<ObjectionResponseDto>> response = new RespData<>();

        List<ObjectionResponseDto> data = objectionService.getObjectionList(id).stream().map(o -> new ObjectionResponseDto(o)).collect(Collectors.toList());
        response.setData(data);

        return response.builder();
    }

    @PostMapping
    private ResponseEntity<?> postObjection(@RequestBody @Valid ObjectionDto objectionDto){
        RespData<Void> response = new RespData<>();

        objectionService.postObjection(objectionDto);

        return response.builder();
    }

    @PostMapping("/admin")
    private ResponseEntity<?> postAdminComment(@RequestBody @Valid ObjectionAdminCommentDto objectionAdminCommentDto){
        RespData<Void> response = new RespData<>();

        objectionService.postAdminComment(objectionAdminCommentDto);

        return response.builder();
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<?> deleteObjection(@PathVariable int id){
        RespData<Void> response = new RespData<>();

        objectionService.deleteObjection(id);

        return response.builder();
    }
}
