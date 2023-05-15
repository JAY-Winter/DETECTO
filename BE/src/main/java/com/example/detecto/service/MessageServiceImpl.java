package com.example.detecto.service;

import com.example.detecto.dto.MessageDto;
import com.example.detecto.entity.EMessage;
import com.example.detecto.entity.User;
import com.example.detecto.exception.DoesNotExistData;
import com.example.detecto.exception.DoesNotExistServer;
import com.example.detecto.exception.MessageException;
import com.example.detecto.repository.MessageRepository;
import com.example.detecto.repository.UserRepository;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    @Value("${fcm.certification}")
    private String credential;

    private final UserRepository userRepository;
    private final MessageRepository messageRepository;

    @PostConstruct
    public void initialize(){
        ClassPathResource resource = new ClassPathResource(credential);

        try (InputStream stream = resource.getInputStream()) {
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(stream))
                    .build();
            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
                log.info("FirebaseApp initialization complete");
            }
        }catch (Exception e){
            e.printStackTrace();
            throw new DoesNotExistServer("INTERNAL SERVER ERROR : FCM");
        }

    }


    @Override
    public List<EMessage> messageList() {
        return messageRepository.findAll();
    }

    @Override
    public List<EMessage> messageList(int id) {
        return messageRepository.findAllByUserId(id);
    }

    @Override
    public void sendMessage(MessageDto messageDto) {
        // id를 통해서 fcmToken 가져오기
        User user = userRepository.findById(messageDto.getId()).orElseThrow(() -> new DoesNotExistData("아이디가 존재하지 않습니다."));

        // fcmToken이 있다면 알림 보내기
        if(user.getFcmToken() != null){
            Notification notification = new Notification(messageDto.getTitle(), messageDto.getMessage());

            Message message = Message.builder()
                    .setNotification(notification)
                    .setToken(user.getFcmToken())
                    .build();
            try {
                String response = FirebaseMessaging.getInstance().send(message);
                log.info("Sent message: " + response);
            }catch (Exception e){
                throw new MessageException(e.getMessage());
            }
        }

        // 데이터 저장
        EMessage newMessage = EMessage.builder()
                            .title(messageDto.getTitle())
                            .message(messageDto.getMessage())
                            .user(user)
                            .build();

        messageRepository.save(newMessage);
    }

    @Override
    public void deleteMessage(int id) {
        messageRepository.deleteById(id);
    }
}
