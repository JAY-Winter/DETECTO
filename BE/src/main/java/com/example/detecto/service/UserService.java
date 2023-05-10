package com.example.detecto.service;

import com.example.detecto.dto.UserDto;
import com.example.detecto.entity.User;

import java.util.Optional;

public interface UserService{
    User login(UserDto userDto);

    void saveFcmToken(User user);

    void deleteFcmToken(UserDto userDto);
}
