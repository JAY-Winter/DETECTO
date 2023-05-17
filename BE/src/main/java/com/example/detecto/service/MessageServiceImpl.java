package com.example.detecto.service;

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
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;
import nl.martijndwars.webpush.Subscription;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.List;
import java.util.StringTokenizer;

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
    public void sendMessage(int id){
//        // id를 통해서 fcmToken 가져오기
//        User user = userRepository.findById(id).orElseThrow(() -> new DoesNotExistData("아이디가 존재하지 않습니다."));
//
//        StringTokenizer st = new StringTokenizer(user.getToken());
//
//        String endpoint = st.nextToken();
//        String p256dh = st.nextToken();
//        String auth = st.nextToken();
//
//        log.info(endpoint);
//        log.info(p256dh);
//        log.info(auth);
//
//
//        try {
//
//            PushService pushService = new PushService(
//                    "BNTfmBKaXrAYZD2GMXsIs4I4BzvvJcR4yJRkJ9SN1xUmO0kTxB1OgSpe0njYaBpaW-SvJipp5oYlyUXn8-9v3LE",
//                    "et70mIvLIq8_y2EkhTIgb2TunRj58Nqf5-xAB4sZ1B8",
//                    "mailto:tasdvzsv123est@naver.com"
//            );
//
//            Subscription.Keys keys = new Subscription.Keys(p256dh, auth);
//            Subscription sub = new Subscription(endpoint,keys);
//
//
//            String payload = "{\"title\":\"위반사항 안내\", \"body\" :\"" + user.getName() + "님께서는 보호구 착용을 위반하였습니다. \\n 이의제기를 원하시면 홈페이지를 방문해주세요.\"}";
//            Notification notification = new Notification(sub, payload);
//
//
//            pushService.send(notification);
//        } catch (Exception e) {
//            log.info(e.getMessage());
//            throw new MessageException("Push 알람이 error로 인해 실패하였습니다.");
//        }
//
//        User admin = userRepository.findById(730808).orElseThrow(() -> new DoesNotExistData("아이디가 존재하지 않습니다."));
//
//        st = new StringTokenizer(admin.getToken());
//
//        endpoint = st.nextToken();
//        p256dh = st.nextToken();
//        auth = st.nextToken();
//
//        log.info(endpoint);
//        log.info(p256dh);
//        log.info(auth);
//
//        try {
//
//            PushService pushService = new PushService(
//                    "BNTfmBKaXrAYZD2GMXsIs4I4BzvvJcR4yJRkJ9SN1xUmO0kTxB1OgSpe0njYaBpaW-SvJipp5oYlyUXn8-9v3LE",
//                    "et70mIvLIq8_y2EkhTIgb2TunRj58Nqf5-xAB4sZ1B8",
//                    "mailto:tasdvzsv123est@naver.com"
//            );
//
//            Subscription.Keys keys = new Subscription.Keys(p256dh, auth);
//            Subscription sub = new Subscription(endpoint,keys);
//
//
//            String payload = "{\"title\":\"위반인원 안내\", \"body\" :\"" + user.getName() + "님께서는 보호구 착용을 위반하였습니다.\"}";
//            Notification notification = new Notification(sub, payload);
//
//
//            pushService.send(notification);
//        } catch (Exception e) {
//            log.info(e.getMessage());
//            throw new MessageException("Push 알람이 error로 인해 실패하였습니다.");
//        }

    }

    @Override
    public void deleteMessage(int id) {
    //    messageRepository.deleteById(id);
    }
}
