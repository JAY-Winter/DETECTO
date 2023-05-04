package com.example.detecto.config;


import com.example.detecto.interceptor.SessionInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class InterceptorConfig implements WebMvcConfigurer {

    private final SessionInterceptor sessionInterceptor;


    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(sessionInterceptor)
                .addPathPatterns("/**") // 세션 인증을 확인할 URL 패턴을 설정합니다.
                .excludePathPatterns("/user/login"); // 인증을 확인하지 않을 URL 패턴을 설정합니다.
    }
}
