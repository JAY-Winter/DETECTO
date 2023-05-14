package com.example.detecto.api;


import com.example.detecto.data.RespData;
import com.example.detecto.dto.MessageDto;
import com.example.detecto.dto.MessageResponseDto;
import com.example.detecto.service.MessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/fcm")
public class MessageController {

    private final MessageService messageService;

    @GetMapping
    private ResponseEntity<?> messageList(){
        RespData<List<MessageResponseDto>> response = new RespData<>();

        List<MessageResponseDto> data = messageService.messageList().stream().map((m) -> new MessageResponseDto(m)).collect(Collectors.toList());
        response.setData(data);

        return response.builder();
    }

    @GetMapping("/{id}")
    private ResponseEntity<?> messageList(@PathVariable int id){
        RespData<List<MessageResponseDto>> response = new RespData<>();

        List<MessageResponseDto> data = messageService.messageList(id).stream().map((m) -> new MessageResponseDto(m)).collect(Collectors.toList());
        response.setData(data);

        return response.builder();
    }

    @PostMapping
    private ResponseEntity<?> sendMessage(@RequestBody @Valid MessageDto messageDto){
        RespData<Void> response = new RespData<>();

        messageService.sendMessage(messageDto);

        return response.builder();
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<?> deleteMessage(@PathVariable int id){
        RespData<Void> response = new RespData<>();

        messageService.deleteMessage(id);

        return response.builder();
    }
}
