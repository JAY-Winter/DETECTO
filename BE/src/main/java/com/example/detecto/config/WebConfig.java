package com.example.detecto.config;

import com.example.detecto.interceptor.SessionInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final SessionInterceptor sessionInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(sessionInterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns("/api/user/login");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:8088", "http://localhost:5173", "http://localhost:4173", "http://k8d201.p.ssafy.io:5173", "https://k8d201.p.ssafy.io") // 프론트엔드 서버의 도메인을 허용합니다.
                .allowedMethods("*")
                .allowCredentials(true) // 쿠키 사용 허용
                .maxAge(3600);
    }
}
