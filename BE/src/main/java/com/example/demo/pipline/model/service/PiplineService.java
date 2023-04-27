package com.example.demo.pipline.model.service;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.atomic.AtomicBoolean;

@Component
@RequiredArgsConstructor
public class PiplineService {

    private final RabbitMQService rabbitMQService;
    private final RabbitTemplate rabbitTemplate;
    private final AtomicBoolean collecting = new AtomicBoolean(false);
    private final ConcurrentLinkedQueue<String> imageQueue = new ConcurrentLinkedQueue<>();

    private class VideoDTO {
        private Boolean flag;
        private String frame;
        private List<Integer> detected_classes;
    }

    @KafkaListener(topics = "test", groupId = "test")
    public void consume(String message) {
        Gson gson = new Gson();
        VideoDTO videoDTO = gson.fromJson(message, VideoDTO.class);
        String frame = videoDTO.frame;

        rabbitMQService.sendMessage("record.1", frame);
    }
}
