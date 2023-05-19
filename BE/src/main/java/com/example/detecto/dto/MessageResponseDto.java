package com.example.detecto.dto;

import com.example.detecto.entity.EMessage;

import java.time.LocalDateTime;

public class MessageResponseDto {

    private int id;

    private String title;

    private String message;

    private LocalDateTime createdAt;

    public MessageResponseDto(EMessage eMessage){
        this.id = eMessage.getId();
        this.title = eMessage.getTitle();
        this.message = eMessage.getMessage();
        this.createdAt = eMessage.getCreatedAt();
    }
}
