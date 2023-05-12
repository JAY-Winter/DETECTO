package com.example.detecto.interceptor;

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
        Cookie[] cookies = request.getCookies();
        String sessionIdFromCookie = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("SESSIONID".equals(cookie.getName())) {
                    sessionIdFromCookie = cookie.getValue();
                    break;
                }
            }
        }

        if (sessionIdFromCookie == null) {
            return extracted(response);
        }

        HttpSession session = request.getSession(false);
        if (session == null || !sessionIdFromCookie.equals(session.getId())) {
            return extracted(response);
        }

//        Object userObj = session.getAttribute("user");
//        if (userObj instanceof UserDto) {
//            // 인증 성공
//            return true;
//        } else {
//            return extracted(response);
//        }

        return true;
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
