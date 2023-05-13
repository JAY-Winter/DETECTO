package com.example.detecto.api;

import com.example.detecto.data.RespData;
import com.example.detecto.dto.EquipmentEditDto;
import com.example.detecto.dto.UserDto;
import com.example.detecto.dto.UserResponseDto;
import com.example.detecto.entity.User;
import com.example.detecto.exception.AuthFailException;
import com.example.detecto.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDto userDto, HttpServletRequest req, HttpServletResponse res) {
        RespData<UserResponseDto> response = new RespData<>();

        User user = userService.login(userDto);

        // 기존 세션 무효화
        HttpSession session = req.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        // 세션 생성 및 사용자 정보 저장
        session = req.getSession(true);
        session.setAttribute("user", user);

        // 쿠키에 세션 ID 저장
        Cookie sessionCookie = new Cookie("SESSIONID", session.getId());
        sessionCookie.setMaxAge(60 * 60); // 쿠키 유효기간 설정 (예: 1시간)
        sessionCookie.setHttpOnly(true); // 쿠키가 HTTP 전송에만 사용되도록 설정 (옵션)
        sessionCookie.setSecure(true); // 쿠키가 HTTPS 연결에서만 전송되도록 설정 (옵션)
        sessionCookie.setPath("/");

        res.addHeader("Set-Cookie", sessionCookie.toString() + "; SameSite=Strict");
        res.addCookie(sessionCookie);

        user.setFcmToken(userDto.getFcmToken());
        user.setSessionId(session.getId());

        // User 객체를 데이터베이스에 저장
        userService.save(user);

        response.setData(new UserResponseDto(user));

        return response.builder();
    }

    @PostMapping("/auth")
    public ResponseEntity<?> auth(HttpServletRequest req) {
        RespData<UserResponseDto> response = new RespData<>();
        // 인터셉터에서 처리되므로, 인증에 성공했다고 가정하고 응답을 반환합니다.
        Cookie[] cookies = req.getCookies();

        String myCookieValue = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                System.out.println(cookie.getName());
                if ("SESSIONID".equals(cookie.getName())) {
                    myCookieValue = cookie.getValue();
                    break;
                }
            }
        }

        HttpSession session = req.getSession(false);

        if (session == null || !myCookieValue.equals(session.getId())) {
            throw new AuthFailException("Authenticated fail");
        }

        User user = (User)session.getAttribute("user");

        response.setData(new UserResponseDto(user));

        return response.builder();
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody UserDto userDto, HttpServletRequest req, HttpServletResponse res) {
        RespData<Void> response = new RespData<>();

        // 사용자의 세션을 가져옵니다.
        HttpSession session = req.getSession(false);

        // 세션이 존재하면 무효화합니다.
        if (session != null) {
            session.invalidate();
        }

        // 쿠키를 제거하려면 Set-Cookie 헤더를 사용하여 클라이언트에게 쿠키를 무효화하도록 지시합니다.
        res.setHeader("Set-Cookie", "SESSIONID=; Path=/; HttpOnly; Max-Age=0");
        userService.delete(userDto);
        // 로그아웃 성공에 대한 응답을 반환합니다.
        return response.builder();
    }

    @PutMapping("/{id}/theme")
    public ResponseEntity<?> themeEdit(@PathVariable int id){
        RespData<Void> response = new RespData<>();
        userService.themeEdit(id);
        return response.builder();
    }
}
