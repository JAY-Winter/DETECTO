package com.example.demo.user.model.service;

import com.example.demo.user.model.domain.User;
import com.example.demo.user.model.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private UserRepository userRepository;

    public Optional<User> findByNumber(String number) {
        return userRepository.findByNumber(number);
    }


}
