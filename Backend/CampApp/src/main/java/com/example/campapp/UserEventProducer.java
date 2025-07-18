package com.example.campapp;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
public class UserEventProducer {

    private final RabbitTemplate rabbitTemplate;

    // Le nom direct de la queue
    private static final String USER_QUEUE = "user.queue";

    public UserEventProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendUserId(Integer userId) {
        rabbitTemplate.convertAndSend(USER_QUEUE, userId.toString());
        System.out.println("✅ Sent user ID to RabbitMQ (direct to queue): " + userId);
    }
}
