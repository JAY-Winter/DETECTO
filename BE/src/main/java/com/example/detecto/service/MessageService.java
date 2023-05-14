package com.example.detecto.service;

import com.example.detecto.dto.MessageDto;
import com.example.detecto.entity.EMessage;

import java.util.List;

public interface MessageService {

    List<EMessage> messageList();

    List<EMessage> messageList(int id);

    void sendMessage(MessageDto messageDto);

    void deleteMessage(int id);
}
