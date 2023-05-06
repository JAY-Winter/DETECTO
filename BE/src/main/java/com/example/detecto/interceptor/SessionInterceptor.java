package com.example.detecto.interceptor;

import com.example.detecto.dto.UserDto;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.IOException;

@Component
public class SessionInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        HttpSession session = request.getSession(false);

        if (session == null) {
            return extracted(response);
        } else {
            Object userObj = session.getAttribute("user");
            if (userObj instanceof UserDto) {
                // 인증 성공
                return true;
            } else {
                return extracted(response);
            }
        }
    }

    private boolean extracted(HttpServletResponse response) throws IOException {
        // 쿠키 삭제
        Cookie sessionCookie = new Cookie("SESSIONID", "");
        sessionCookie.setMaxAge(0);
        sessionCookie.setHttpOnly(true);
        sessionCookie.setPath("/");
        response.addCookie(sessionCookie);

        // 인증 실패 응답
        response.sendError(HttpStatus.BAD_REQUEST.value(), "fail Authentication");
        return false;
    }
}
