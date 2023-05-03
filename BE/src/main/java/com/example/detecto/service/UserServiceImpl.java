package com.example.detecto.service;

import com.example.detecto.dto.UserDto;
import com.example.detecto.entity.User;
import com.example.detecto.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Override
    public Optional<User> login(UserDto userDto) {
        return userRepository.findByIdAndPassword(userDto.getId(), userDto.getPassword());
    }
}
