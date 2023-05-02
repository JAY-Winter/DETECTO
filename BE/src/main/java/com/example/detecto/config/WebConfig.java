package com.example.detecto.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:8088") // 프론트엔드 서버의 도메인을 허용합니다.
                .allowedMethods("*")
                .allowCredentials(true) // 쿠키 사용 허용
                .maxAge(3600);
    }
}
