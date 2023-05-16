package com.example.detecto.api;


import com.example.detecto.data.RespData;
import com.example.detecto.dto.MessageResponseDto;
import com.example.detecto.service.MessageService;
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

    @GetMapping("/send/{id}")
    private ResponseEntity<?> sendMessage(@PathVariable int id){
        RespData<Void> response = new RespData<>();

        messageService.sendMessage(id);

        return response.builder();
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<?> deleteMessage(@PathVariable int id){
        RespData<Void> response = new RespData<>();

        messageService.deleteMessage(id);

        return response.builder();
    }
}
