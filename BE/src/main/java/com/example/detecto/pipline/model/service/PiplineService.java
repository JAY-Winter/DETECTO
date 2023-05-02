package com.example.detecto.pipline.model.service;

import org.springframework.kafka.annotation.KafkaListener;

public interface PiplineService {
    @KafkaListener(topics = "test", groupId = "test")
    void consume(String message);
}
