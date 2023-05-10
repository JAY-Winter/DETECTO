package com.example.detecto.service;

import com.example.detecto.dto.UserDto;
import com.example.detecto.entity.User;
import com.example.detecto.exception.DoesNotExistData;
import com.example.detecto.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Override
    public User login(UserDto userDto) {
        return userRepository.findByIdAndPassword(userDto.getId(), userDto.getPassword()).orElseThrow(() -> new DoesNotExistData("아이디가 존재하지 않습니다."));
    }

    @Override
    public void saveFcmToken(User user) {
        userRepository.save(user);
    }

    @Override
    public void deleteFcmToken(UserDto userDto) {
        User user = userRepository.findByIdAndPassword(userDto.getId(), userDto.getPassword()).orElseThrow(() -> new DoesNotExistData("아이디가 존재하지 않습니다."));
        user.setFcmToken(null);
        userRepository.save(user);
    }
}
