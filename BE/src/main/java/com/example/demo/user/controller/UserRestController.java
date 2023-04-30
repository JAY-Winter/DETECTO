package com.example.demo.user.controller;

import com.example.demo.user.model.domain.User;
import com.example.demo.user.model.service.UserService;
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
public class UserRestController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody User loginUser, HttpServletRequest request, HttpServletResponse response) {
        if (loginUser.getNumber() == null || loginUser.getPassword() == null) {
            response.setHeader("Set-Cookie", "logout=true; Max-Age=0; Path=/");
            return ResponseEntity.badRequest().build();
        }

        Optional<User> user = userService.findByNumber(loginUser.getNumber());
        if (user.isPresent() && user.get().getPassword().equals(loginUser.getPassword())) {
            HttpSession session = request.getSession(true);
            session.setAttribute("user", user.get());

            return ResponseEntity.ok()
                    .header("Set-Cookie", "JSESSIONID=" + session.getId() + "; Path=/")
                    .body(user.get());
        } else {
            response.setHeader("Set-Cookie", "logout=true; Max-Age=0; Path=/");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/auth")
    public ResponseEntity<?> getUser(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            response.setHeader("Set-Cookie", "logout=true; Path=/");
            return ResponseEntity.badRequest().build();
        } else {
            Object userObj = session.getAttribute("user");
            if (userObj instanceof User) {
                User user = (User) userObj;
                return ResponseEntity.ok().body(user);
            } else {
                session.invalidate();
                response.setHeader("Set-Cookie", "cookieToDelete=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT");
                return ResponseEntity.badRequest().build();
            }
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        response.setHeader("Set-Cookie", "logout=true; Path=/; Max-Age=0");
        return ResponseEntity.ok().build();
    }

}
