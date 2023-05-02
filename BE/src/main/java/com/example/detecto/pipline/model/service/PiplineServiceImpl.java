package com.example.detecto.pipline.model.service;

import com.example.detecto.pipline.model.dto.VideoDto;
import com.google.gson.Gson;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
public class PiplineServiceImpl implements PiplineService {
    private final RabbitTemplate rabbitTemplate;

    public PiplineServiceImpl(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    @Override
    public void consume(String message) {
        Gson gson = new Gson();
        VideoDto video = gson.fromJson(message, VideoDto.class);
        String frame = video.frame;
        rabbitTemplate.convertAndSend("record.exchange", "record.*", frame);
    }
}
