//package com.example.detecto.config;
//
//import com.example.detecto.exception.DoesNotExistServer;
//import com.google.auth.oauth2.GoogleCredentials;
//import com.google.firebase.FirebaseApp;
//import com.google.firebase.FirebaseOptions;
//import jakarta.annotation.PostConstruct;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.core.io.ClassPathResource;
//import org.springframework.stereotype.Component;
//
//import java.io.InputStream;
//
//@Component
//@Slf4j
//public class FCMConfig {
//
//    @Value("${fcm.certification}")
//    private String credential;
//
//    @PostConstruct
//    public void initialize(){
//        ClassPathResource resource = new ClassPathResource(credential);
//
//        try (InputStream stream = resource.getInputStream()) {
//            FirebaseOptions options = FirebaseOptions.builder()
//                    .setCredentials(GoogleCredentials.fromStream(stream))
//                    .build();
//            if (FirebaseApp.getApps().isEmpty()) {
//                FirebaseApp.initializeApp(options);
//                log.info("FirebaseApp initialization complete");
//            }
//        }catch (Exception e){
//            e.printStackTrace();
//            throw new DoesNotExistServer("INTERNAL SERVER ERROR : FCM");
//        }
//
//    }
//}