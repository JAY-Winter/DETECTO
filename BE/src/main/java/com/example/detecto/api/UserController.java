package com.example.detecto.api;

import com.example.detecto.data.RespData;
import com.example.detecto.dto.UserDto;
import com.example.detecto.entity.User;
import com.example.detecto.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDto userDto, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("들어오니?");
        Optional<User> OptionalUser = userService.login(userDto);

        if (OptionalUser.isPresent()) {
            // 기존 세션 무효화
            HttpSession session = request.getSession(false);
            if (session != null) {
                session.invalidate();
            }

            // 세션 생성 및 사용자 정보 저장
            session = request.getSession(true);
            session.setAttribute("user", userDto);

            // 쿠키에 세션 ID 저장
            Cookie sessionCookie = new Cookie("JSESSIONID", session.getId());
            sessionCookie.setMaxAge(60 * 60); // 쿠키 유효기간 설정 (예: 1시간)
            sessionCookie.setHttpOnly(true); // 쿠키가 HTTP 전송에만 사용되도록 설정 (옵션)
            //sessionCookie.setDomain("https://k8d201.p.ssafy.io"); // 쿠키 도메인 설정
            //sessionCookie.setSecure(true); // 쿠키가 HTTPS 연결에서만 전송되도록 설정 (옵션)
            sessionCookie.setPath("/");

            response.addHeader("Set-Cookie", sessionCookie.toString() + "; SameSite=None");
            response.addCookie(sessionCookie);

            RespData result = RespData.builder()
                            .flag(true)
                            .data(OptionalUser.get())
                            .build();

            return result.get();
        } else {
            // 인증 실패 시 에러 메시지 반환
            return new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping("/auth")
    public ResponseEntity<?> auth(HttpServletRequest request, HttpServletResponse response) {
        // 인터셉터에서 처리되므로, 인증에 성공했다고 가정하고 응답을 반환합니다.
        Cookie[] cookies = request.getCookies();

        String myCookieValue = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                System.out.println(cookie.getName());
                if ("JSESSIONID".equals(cookie.getName())) {
                    myCookieValue = cookie.getValue();
                    break;
                }
            }
        }

        if (myCookieValue != null) {
            return ResponseEntity.status(200).body("Authenticated successfully");
        } else {
            return ResponseEntity.status(400).body("Authenticated fail");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        // 사용자의 세션을 가져옵니다.
        HttpSession session = request.getSession(false);

        // 세션이 존재하면 무효화합니다.
        if (session != null) {
            session.invalidate();
        }

        // 쿠키를 제거하려면 Set-Cookie 헤더를 사용하여 클라이언트에게 쿠키를 무효화하도록 지시합니다.
        response.setHeader("Set-Cookie", "JSESSIONID=; Path=/; HttpOnly; Max-Age=0");

        // 로그아웃 성공에 대한 응답을 반환합니다.
        return ResponseEntity.ok().build();
    }
}
